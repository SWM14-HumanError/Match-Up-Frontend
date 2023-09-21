import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import ImgUpload from '../../components/inputs/ImgUpload.tsx';
import SelectStackLevelList from '../../components/inputs/SelectStackLevelList.tsx';
import useUniqueNickname, {FetchStatus} from '../../hooks/useUniqueNickname.ts';
import {IMyPageEdit, IMyPageEditRequest} from '../../constant/interfaces.ts';
import {InitMyPageEdit} from '../../constant/initData.ts';
import {LocationNames} from '../../constant/selectOptions.ts';
import Api from '../../constant/Api.ts';
import '../../styles/MainProjectPage.scss';
import SelectLinkList from "../../components/inputs/SelectLinkList.tsx";
import authControl from "../../constant/authControl.ts";

function EditProjectInfoPage() {
  const navigate = useNavigate();
  const [userProfileData, setUserProfileData] = useState<IMyPageEdit>(InitMyPageEdit);
  const [base64, setBase64] = useState<string | null>(null);

  const nicknameAvailable = useUniqueNickname(userProfileData.nickname);
  const token = authControl.getInfoFromToken();
  const userID = token ? token.id : 0;

  useEffect(() => {
    Api.fetch2Json(`/api/v1/profile/${userID}`)
      .then(res => setUserProfileData({...res}))
      .catch(err => console.log(err));
  }, []);

  function saveUserProfile() {
    if (!userProfileData.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    else if (nicknameAvailable !== FetchStatus.SUCCESS) {
      alert('닉네임 중복확인을 해주세요.');
      return;
    }
    
    Api.fetch2Json(`/api/v1/profile/${userID}`, 'PUT', getNormalizData(userProfileData))
      .then(res => {
        if (res.token) {
          document.cookie = `token=${res.token}; path=/`;
          document.cookie = `tokenExpire=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)}; path=/`;
        }
        navigate('/mypage');
      })
      .catch(err => console.error(err));
  }

  function deleteUser() {
    if (!confirm('정말로 탈퇴하시겠습니까?'))
      return;

    Api.fetch2Json(`/api/v1/profile/${userID}`, 'DELETE')
      .then(res => {
        console.log(res);
        authControl.logout();
      })
      .catch(err => console.log(err));
  }

  function getNormalizeMeetingType(type: string) {
    switch (type) {
      case '온라인':
        return 'ONLINE';
      case '오프라인':
        return 'OFFLINE';
      default:
        return 'FREE';
    }
  }

  function getNormalizData(data: any) {
    const result: IMyPageEditRequest = {
      pictureUrl: base64,
      nickname: data.nickname,
      Link: data.links,
      introduce: data.introduce,
      userPositionLevels: data.userPositionLevels,
      meetingType: getNormalizeMeetingType(data.meetingType),
      meetingAddress: data.meetingAddress,
      meetingTime: data.meetingTime,
      meetingNote: data.meetingNote,
    }
    return result;
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>프로필 수정</h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>프로필 이미지</h2>
              <ImgUpload setBase64={setBase64}/>
            </div>

            <div>
              <h2>닉네임</h2>
              <div className='inputs_layout'>
                <input type='text'
                       placeholder='닉네임을 입력해주세요'
                       value={userProfileData.nickname}
                       onChange={e => setUserProfileData(prev => ({...prev, nickname: e.target.value}))}/>
              </div>
              <div>
                { nicknameAvailable === FetchStatus.LOADING ? (
                  <span className='fetch_box loading'>중복확인 중...</span>
                ) : nicknameAvailable === FetchStatus.SUCCESS ? (
                  <span className='fetch_box success'>사용 가능한 닉네임입니다.</span>
                ) : nicknameAvailable === FetchStatus.FAILURE ? (
                  <span className='fetch_box failure'>이미 사용중인 닉네임입니다.</span>
                ) : null}
              </div>
            </div>
          </div>

          <h2>자기소개</h2>
          <textarea placeholder='내용을 작성해 주세요'
                    value={userProfileData.introduce}
                    onChange={e => setUserProfileData(prev => ({
                      ...prev,
                      introduce: e.target.value,
                    }))}/>

          <h2>연락 및 소개 링크</h2>
          <SelectLinkList className='member_selector_layout'
                          setData={data => setUserProfileData(prev => ({
                            ...prev,
                            links: data,
                          }))}/>

          <h2>개발 능력</h2>
          <SelectStackLevelList className='member_selector_layout'
                                setData={data => setUserProfileData(prev => ({
                                  ...prev,
                                  userPositionLevels: data,
                                }))}/>

          <h2>미팅 선호 타입 및 지역</h2>
          <div className='inputs_layout'>
            <SelectBox options={['온라인', '오프라인', '상관없음']}
                       value={userProfileData.meetingType}
                       onChange={value => setUserProfileData(prev => ({...prev, meetingType: value}))}
                       hasDefault={false}/>

            { userProfileData.meetingType === '오프라인' ? (
              <SelectBox options={LocationNames}
                         value={userProfileData.meetingAddress}
                         onChange={value => setUserProfileData(prev => ({...prev, meetingAddress: value}))}
                         hasDefault={false}/>
            ) : null}
          </div>

          <h2>미팅 선호 시간</h2>
          <input type="text"
                 placeholder='미팅 선호 시간을 입력해주세요'
                 value={userProfileData.meetingTime}
                 onChange={e => setUserProfileData(prev => ({
                    ...prev,
                    meetingTime: e.target.value,
                 }))}/>

          <h2>미팅 시 참고 사항</h2>
          <input type="text"
                  placeholder='미팅 시 참고 사항을 입력해주세요'
                  value={userProfileData.meetingNote}
                  onChange={e => setUserProfileData(prev => ({
                    ...prev,
                    meetingNote: e.target.value,
                  }))}/>

          <div className='submit_button_layout'>
            <button onClick={saveUserProfile}>
              저장하기
            </button>
            <button type='button'
                    className='danger'
                    onClick={deleteUser}>
              회원 탈퇴
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default EditProjectInfoPage;