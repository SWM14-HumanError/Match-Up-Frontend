import React from 'react';
import LOGO from '@assets/LOGO.png';
import CloseIcon from '../svgs/CloseIcon.tsx';
import DialogTemplate from './DialogTemplate.tsx';
import authControl from '@constant/authControl.ts';

import '@styles/dialogs/LoginRecommendDialog.scss';

interface ILoginRecommendDialog {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


function LoginRecommendDialog({isOpen, setIsOpen}:ILoginRecommendDialog) {
  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='login_dialog_layout'>
          <div className='dialog_header'>
            <div>
              <h3>로그인</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content text_center'>
            <img className='logo' src={LOGO} alt='Match up logo'/>

            <p>로그인을 하면 더 많은 정보를 볼 수 있습니다</p>
            <p>로그인히여 팀원을 구하고, 마음에 드는 프로젝트에 지원해보세요</p>
          </div>

          <div className='dialog_footer fill'>
            <button onClick={() => authControl.login()}>
              로그인/가입
            </button>
          </div>
        </div>
    </DialogTemplate>
  );
}

export default LoginRecommendDialog;