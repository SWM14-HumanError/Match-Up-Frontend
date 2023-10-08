import {useEffect, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';
import Alert from '../../constant/Alert.ts';
import authControl from '../../constant/authControl.ts';
import Api from '../../constant/Api.ts';

import '../../styles/MainProjectPage.scss';

interface IProfileState {
  isProfileHider: boolean;
  isFeedbackHider: boolean;
}
const InitProfileState: IProfileState = {
  isProfileHider: false,
  isFeedbackHider: false,
}

function ProfileSetting() {
  const [prevProfileState, setPrevProfileState] = useState<IProfileState>(InitProfileState);
  const [profileState, setProfileState] = useState<IProfileState>(InitProfileState);

  useEffect(() => {
    Api.fetch2Json('/api/v1/profile/state')
      .then(data => {
        setPrevProfileState(data);
        setProfileState(data);
      })
      .then(err => console.error(err));
  }, []);

  function saveSettings() {
    const promises = [];

    if (prevProfileState.isProfileHider !== profileState.isProfileHider)
      promises.push(Api.fetch('/api/v1/profile/user/hide', 'PUT'));

    if (prevProfileState.isFeedbackHider !== profileState.isFeedbackHider)
      promises.push(Api.fetch('/api/v1/profile/feedbacks/hide', 'PUT'));

    Promise.all(promises)
      .then(() => {
        Alert.show('저장되었습니다.');
        setPrevProfileState(profileState);
      })
      .catch(err => console.error(err));
  }
  
  function deleteAccount() {
    if (!confirm('정말로 회원 탈퇴를 하시겠습니까?'))
      return;
    
    Api.fetch2Json('/api/v1/user/delete', 'DELETE')
      .then(res => {
        console.log(res);
        authControl.logout();
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>설정</h1>

        <h2>프로필 숨기기</h2>
        <label>
          <input type='checkbox'
                 checked={profileState.isProfileHider}
                 onChange={e => setProfileState(prev => ({...prev, isProfileHider: e.target.checked}))}/>
          <span>프로필 숨기기</span>
        </label>

        <h2>피드백 숨기기</h2>
        <label>
          <input type='checkbox'
                 checked={profileState.isFeedbackHider}
                 onChange={e => setProfileState(prev => ({...prev, isFeedbackHider: e.target.checked}))}/>
          <span>피드백(평가) 숨기기</span>
        </label>

        {Array.from({length: 5}).map((_, i) => (<br key={i}/>))}

        <div className='submit_button_layout'>
          <button onClick={saveSettings}>저장하기</button>
          <button className='danger' onClick={deleteAccount}>회원 탈퇴</button>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default ProfileSetting;