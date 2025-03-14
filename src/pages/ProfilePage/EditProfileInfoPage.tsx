import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import ImgUpload from '@components/inputs/ImgUpload.tsx';
import SelectStackLevelList from '@components/inputs/SelectStackLevelList.tsx';
import LocationSelector from '@components/inputs/LocationSelector.tsx';
import SelectLinkList from '@components/inputs/SelectLinkList.tsx';
import useUniqueNickname, {FetchStatus} from '@hooks/useUniqueNickname.ts';
import Footer from '@components/Footer.tsx';
import {IMyPageDetail, IMyPageEdit, IMyPageEditRequest} from '@constant/interfaces.ts';
import {InitMyPageEdit} from '@constant/initData.ts';
import Alert from '@constant/Alert.ts';
import authControl from '@constant/authControl.ts';
import Api from '@constant/Api.ts';
import '@styles/MainProjectPage.scss';
import {MeetingTypes} from '@constant/selectOptions.ts';


function EditProjectInfoPage() {
  const navigate = useNavigate();

  const nicknameRef = useRef<HTMLInputElement>(null);

  const [userProfileData, setUserProfileData] = useState<IMyPageEdit>(InitMyPageEdit);
  const [prevNickname, setPrevNickname] = useState<string>('');
  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');

  const nicknameAvailable = useUniqueNickname(userProfileData.nickname, prevNickname);
  const token = authControl.getInfoFromToken();
  const userID = token ? token.id : 0;

  useEffect(() => {
    if (!userID || userID <= 0) return;

    Api.fetch2Json(`/api/v1/profile/${userID}`)
      .then(res => {
        const userData: IMyPageDetail = res;
        setUserProfileData({
          pictureUrl: userData.pictureUrl,
          nickname: initializeData(userData.nickname, ''),
          introduce: initializeData(userData.introduce, ''),
          link: userData.snsLinks,
          userPositionLevels: userData.userPositions,
          meetingAddress: initializeData(userData.meetingAddress, ''),
          meetingTime: initializeData(userData.meetingTime, ''),
          meetingType: initializeData(userData.meetingType, 'FREE'),
          meetingNote: initializeData(userData.meetingNote, ''),
        });
        setPrevNickname(res.nickname);
      })
      .catch(err => console.error(err));
  }, []);

  function initializeData<T>(data: T | undefined | null, init: T) {
    return data ? data : init;
  }

  function saveUserProfile() {
    if (!userProfileData.nickname) {
      nicknameRef.current?.focus();
      Alert.show('닉네임을 입력해주세요.');
      return;
    }
    else if (nicknameAvailable !== FetchStatus.SUCCESS && userProfileData.nickname !== prevNickname) {
      Alert.show('닉네임 중복확인을 해주세요.');
      return;
    }
    
    Api.fetch(`/api/v1/profile/${userID}`, 'PUT', getNormalizedData(userProfileData))
      .then(async res => {
        const token = await res?.text();
        if (token)
          authControl.setToken(token)
        navigate('/mypage/profile');
      })
      .catch(err => console.error(err));
  }

  function getNormalizedData(data: any) {
    const result: IMyPageEditRequest = {
      imageBase64: base64,
      imageName: base64FileName,
      nickname: data.nickname,
      link: data.links,
      introduce: data.introduce,
      profileTagPositions: data.profileTagPositions,
      meetingType: data.meetingType,
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
              <ImgUpload messageStart='프로필에'
                         prevImgUrl={userProfileData.pictureUrl}
                         setFileName={setBase64FileName}
                         setBase64={setBase64}/>
            </div>

            <div>
              <h2 className='essential'>닉네임</h2>
              <div className='inputs_layout'>
                <input type='text'
                       ref={nicknameRef}
                       placeholder='닉네임을 입력해주세요'
                       maxLength={19}
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
                    maxLength={699}
                    value={userProfileData.introduce}
                    onChange={e => setUserProfileData(prev => ({
                      ...prev,
                      introduce: e.target.value,
                    }))}/>

          <h2>연락 및 소개 링크</h2>
          <SelectLinkList className='member_selector_layout'
                          value={userProfileData.link}
                          setData={data => setUserProfileData(prev => ({
                            ...prev,
                            links: data,
                          }))}/>

          <h2>개발 능력</h2>
          <SelectStackLevelList className='member_selector_layout'
                                value={userProfileData.userPositionLevels}
                                setData={data => setUserProfileData(prev => ({
                                  ...prev,
                                  profileTagPositions: data,
                                }))}/>

          <h2>미팅 선호 타입 및 지역</h2>
          <div className='inputs_layout'>
            <SelectBox options={MeetingTypes}
                       value={userProfileData.meetingType}
                       onChange={value => setUserProfileData(prev => ({
                         ...prev,
                         meetingType: value || 'FREE',
                       }))}
                       hasDefault={false}/>

            { userProfileData.meetingType === 'OFFLINE' ? (
              <LocationSelector value={userProfileData.meetingAddress}
                                onChange={v => setUserProfileData(prev => ({
                                  ...prev,
                                  meetingAddress: v
                                }))}/>
            ) : null}
          </div>

          <h2>미팅 선호 시간</h2>
          <input type='text'
                 placeholder='미팅 선호 시간을 입력해주세요'
                 maxLength={49}
                 value={userProfileData.meetingTime}
                 onChange={e => setUserProfileData(prev => ({
                    ...prev,
                    meetingTime: e.target.value,
                 }))}/>

          <h2>미팅 시 참고 사항</h2>
          <input type='text'
                  placeholder='미팅 시 참고 사항을 입력해주세요'
                  maxLength={199}
                  value={userProfileData.meetingNote}
                  onChange={e => setUserProfileData(prev => ({
                    ...prev,
                    meetingNote: e.target.value,
                  }))}/>

          <div className='submit_button_layout'>
            <button onClick={saveUserProfile}>
              저장하기
            </button>
            <button className='cancel'
                    onClick={() => navigate('/mypage/profile')}>
              취소하기
            </button>
          </div>
        </div>

      </div>

      <Footer/>
    </>
  );
}

export default EditProjectInfoPage;