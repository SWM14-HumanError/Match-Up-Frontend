import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import {LocationNames} from '../../constant/selectOptions.ts';
import authControl from '../../constant/authControl.ts';
import {IAdditionalInfo} from '../../constant/interfaces.ts';
import {InitAdditionalInfo} from '../../constant/initData.ts';

import '../../styles/SigninTerms.scss';


function UserAdditionalInfo() {
const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfo>(InitAdditionalInfo);

  function saveAdditionalInfo() {
    setIsSubmitting(true);
    fetch('/api/v1/login/user/info', {
      method: 'PUT',
      headers: authControl.getHeader(),
      body: JSON.stringify({
        ...additionalInfo,
        userBirthday: `${additionalInfo.userBirthdayYear}-${additionalInfo.userBirthdayMonth}-${additionalInfo.userBirthdayDay}`,
        meetingType: getNormalizeMeetingType(),
        name: 'default',
      })
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

  function getNormalizeMeetingType() {
    switch (additionalInfo.meetingType) {
      case '온라인':
        return 'ONLINE';
      case '오프라인':
        return 'OFFLINE';
      case '상관없음':
        return 'FREE';
      default:
        return 'FREE';
    }
  }
  
  return (
    <div className='main_layout'>
      <h1>추가 정보 입력</h1>

      <div className='additional_info_layout'>
        <h2>닉네임</h2>
        <input type='text'
               value={additionalInfo.nickname}
               onChange={e => setAdditionalInfo(prev => ({...prev, nickname: e.target.value}))}/>

        <h2>생일</h2>
        <div className='inputs_layout'>
          <SelectBox options={Array.from({length:70}, (_, i) => (i+1960).toString())}
                     value={additionalInfo.userBirthdayYear.toString()}
                     onChange={value => setAdditionalInfo(prev => ({...prev, userBirthdayYear: parseInt(value)}))}
                     hasDefault={false}/>
          <SelectBox options={Array.from({length:12}, (_, i) => (i+1).toString())}
                     value={additionalInfo.userBirthdayMonth.toString()}
                     onChange={value => setAdditionalInfo(prev => ({...prev, userBirthdayMonth: parseInt(value)}))}
                     hasDefault={false}/>
          <SelectBox options={Array.from({length:31}, (_, i) => (i+1).toString())}
                     value={additionalInfo.userBirthdayDay.toString()}
                     onChange={value => setAdditionalInfo(prev => ({...prev, userBirthdayDay: parseInt(value)}))}
                     hasDefault={false}/>
        </div>

        <h2>거주지 주소</h2>
        <div className='inputs_layout'>
          <SelectBox options={LocationNames}
                     value={additionalInfo.address}
                     onChange={value => setAdditionalInfo(prev => ({...prev, address: value}))}
                     hasDefault={false}/>
        </div>

        <h2>미팅 선호 타입</h2>
        <SelectBox options={['온라인', '오프라인', '상관없음']}
                   value={additionalInfo.meetingType}
                   onChange={value => setAdditionalInfo(prev => ({...prev, meetingType: value}))}
                   hasDefault={false}/>

        <h2>position</h2>
        <input type='text'
               value={additionalInfo.position}
               onChange={e => setAdditionalInfo(prev => ({...prev, position: e.target.value}))}/>


        <h2>positionLevel</h2>
        <input type='number'
               value={additionalInfo.positionLevel.toString()}
               onChange={e => setAdditionalInfo(prev => ({...prev, positionLevel: parseInt(e.target.value)}))}/>

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