import {useNavigate} from 'react-router-dom';
import Bell from '../svgs/Bell.tsx';
import Settings from '../svgs/Settings.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import AlarmLayout, {AlarmMenu, useAlarmLayout} from './AlarmLayout.tsx';
import authControl from '@constant/authControl.ts';

interface IAlarmModal {
  setHasAlarm: (hasAlarm: boolean) => void;
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
  target: HTMLElement | null;
}

function AlarmModal({setIsAlarmModalOpened, target, setHasAlarm}: IAlarmModal) {
  const navigate = useNavigate();
  const {isMenuOpened, setIsMenuOpened, AlarmMenuData, setAlarmMenuData} = useAlarmLayout();

  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 400;
  const x = center - width / 2;
  const adjustedX = window.innerWidth < x + width ? window.innerWidth - width - 16 : x;

  // @ts-ignore
  return (
    <>
      {isMenuOpened && <AlarmMenu {...AlarmMenuData} setIsMenuOpened={setIsMenuOpened}/>}
      <div className='modal_background alarm_modal'
           style={{left: adjustedX}}
           onClick={e => e.stopPropagation()}>
        <div className='alarm_header_layout'>
          <div className='header_title_layout'>
            <Bell width={28} height={28} state={0}/>
            <h3>알림</h3>
          </div>

          <div className='header_button_layout'>
            <button className='link' onClick={authControl.logout}>로그아웃</button>
            <button className='svg_button' onClick={() => navigate('/profile/settings')}>
              <Settings width={28} height={28}/>
            </button>
            <button className='svg_button'
                    onClick={() => setIsAlarmModalOpened(false)}>
              <CloseIcon width={28} height={28}/>
            </button>
          </div>
        </div>

        <AlarmLayout setIsAlarmModalOpened={setIsAlarmModalOpened}
                     setIsMenuOpened={setIsMenuOpened}
                     setHasAlarm={setHasAlarm}
                     setAlarmMenuData={setAlarmMenuData}/>
      </div>
    </>
  );
}

export default AlarmModal;