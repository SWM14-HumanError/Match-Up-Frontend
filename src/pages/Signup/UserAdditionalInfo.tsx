import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import SelectStackLevelList from '../../components/inputs/SelectStackLevelList.tsx';
import useUniqueNickname, {FetchStatus} from '../../hooks/useUniqueNickname.ts';
import ImgUpload from '../../components/inputs/ImgUpload.tsx';
// import {LocationNames} from '../../constant/selectOptions.ts';
import {IAdditionalInfoRequest} from '../../constant/interfaces.ts';
import {InitAdditionalInfo} from '../../constant/initData.ts';
import Api from '../../constant/Api.ts';

import '../../styles/SigninTerms.scss';

function UserAdditionalInfo() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [base64, setBase64] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfoRequest>(InitAdditionalInfo);
  const [birthday, setBirthday] = useState({
    year: 2000, month: 3, day: 1,
  });
  
  const nicknameAvailable = useUniqueNickname(additionalInfo.nickname);

  function saveAdditionalInfo() {
    if (!additionalInfo.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    else if (nicknameAvailable !== FetchStatus.SUCCESS) {
      alert('닉네임 중복확인을 해주세요.');
      return;
    }

    setIsSubmitting(true);
    Api.fetch2Json('/api/v1/login/user/info', 'PUT', {
      ...additionalInfo,
      birthDay: `${birthday.year}-${birthday.month}-${birthday.day}`,
      pictureUrl: base64,
    })
      .then(res => {
        if (res.status < 300) {
          setIsSubmitting(false);

          const redirectUrl = localStorage.getItem('redirectUrl');
          navigate(redirectUrl ? redirectUrl : '/');
        }
        else {
          setIsSubmitting(false);
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      })
  }

  // function getNormalizeMeetingType() {
  //   switch (additionalInfo.meetingType) {
  //     case '온라인':
  //       return 'ONLINE';
  //     case '오프라인':
  //       return 'OFFLINE';
  //     case '상관없음':
  //       return 'FREE';
  //     default:
  //       return 'FREE';
  //   }
  // }

  return (
    <div className='main_layout'>
      <h1>추가 정보 입력</h1>

      <div className='additional_info_layout'>
        <h2>프로필 사진</h2>
        <ImgUpload setBase64={setBase64}/>

        <h2>닉네임</h2>
        <div className='inputs_layout'>
          <input type='text'
                 value={additionalInfo.nickname}
                 onChange={e => setAdditionalInfo(prev => ({...prev, nickname: e.target.value}))}/>

          { nicknameAvailable === FetchStatus.LOADING ? (
            <span className='fetch_box loading'>중복확인 중...</span>
          ) : nicknameAvailable === FetchStatus.SUCCESS ? (
            <span className='fetch_box success'>사용 가능한 닉네임입니다.</span>
          ) : nicknameAvailable === FetchStatus.FAILURE ? (
            <span className='fetch_box failure'>이미 사용중인 닉네임입니다.</span>
          ) : null}
        </div>

        <h2>생일</h2>
        <div className='inputs_layout'>
          <SelectBox options={Array.from({length:70}, (_, i) => (i+1960).toString())}
                     value={birthday.year.toString()}
                     onChange={value => setBirthday(prev => ({...prev, year: parseInt(value)}))}
                     hasDefault={false}/>
          <SelectBox options={Array.from({length:12}, (_, i) => (i+1).toString())}
                     value={birthday.month.toString()}
                     onChange={value => setBirthday(prev => ({...prev, month: parseInt(value)}))}
                     hasDefault={false}/>
          <SelectBox options={Array.from({length:31}, (_, i) => (i+1).toString())}
                     value={birthday.day.toString()}
                     onChange={value => setBirthday(prev => ({...prev, day: parseInt(value)}))}
                     hasDefault={false}/>
        </div>

        <h2>개발 연차</h2>
        <label>
          <input type='number'
                 min={0}
                 value={additionalInfo.expYear.toString()}
                 onChange={e => setAdditionalInfo(prev => ({...prev, expYear: parseInt(e.target.value)}))}/>
          &nbsp; 년
        </label>

        {/*<h2>거주지 주소</h2>*/}
        {/*<div className='inputs_layout'>*/}
        {/*  <SelectBox options={LocationNames}*/}
        {/*             value={additionalInfo.address}*/}
        {/*             onChange={value => setAdditionalInfo(prev => ({...prev, address: value}))}*/}
        {/*             hasDefault={false}/>*/}
        {/*</div>*/}

        {/*<h2>미팅 선호 타입</h2>*/}
        {/*<SelectBox options={['온라인', '오프라인', '상관없음']}*/}
        {/*           value={additionalInfo.meetingType}*/}
        {/*           onChange={value => setAdditionalInfo(prev => ({...prev, meetingType: value}))}*/}
        {/*           hasDefault={false}/>*/}

        {/*<h2>position</h2>*/}
        {/*<input type='text'*/}
        {/*       value={additionalInfo.position}*/}
        {/*       onChange={e => setAdditionalInfo(prev => ({...prev, position: e.target.value}))}/>*/}


        <h2>개발 능력</h2>
        <SelectStackLevelList className='member_selector_layout'
                              setData={(data) => setAdditionalInfo(prev => ({
                                ...prev,
                                userPositionLevels: {...data},
                              }))}/>

        <div className='submit_button_layout'>
          <button onClick={saveAdditionalInfo}
                  disabled={isSubmitting}>
            저장하기
          </button>

          <button className='cancel'
                  onClick={() => {
                    const redirectUrl = localStorage.getItem('redirectUrl');
                    navigate(redirectUrl ? redirectUrl : '/');
                  }}>
            나중에입력
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserAdditionalInfo;