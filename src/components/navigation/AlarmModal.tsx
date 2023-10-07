import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Bell from '../svgs/Bell.tsx';
import Settings from '../svgs/Settings.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import CircleHamburger from '../svgs/CircleHamburger.tsx';
import useInfScroll4Widget from '../../hooks/useInfScroll4Widget.ts';
import {IAlarmData, IAlarmList} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';
import dataGen from '../../constant/dateGen.ts';
import Api from '../../constant/Api.ts';
import { JSX } from 'react/jsx-runtime';

interface IAlarmModal {
  setHasAlarm: (hasAlarm: boolean) => void;
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
  target: HTMLElement | undefined;
}

//PROJECT, STUDY, FEED, MENTORING, ETC
const AlarmCategories = [
  {
    name: '전체',
    path: undefined,
  },
  {
    name: '프로젝트',
    path: 'PROJECT',
  },
  {
    name: '스터디',
    path: 'STUDY',
  },
  {
    name: '피드',
    path: 'FEED',
  },
  {
    name: '멘토링',
    path: 'MENTORING',
  },
  {
    name: '기타',
    path: 'ETC',
  },
];

const InitialAlarmData: IAlarmList = {
  alertResponseList: [],
  size: 0,
  hasNextSlice: false,
}

function AlarmModal({setIsAlarmModalOpened, target, setHasAlarm}: IAlarmModal) {
  const navigate = useNavigate();
  const infScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [AlarmMenuData, setAlarmMenuData] = useState<IAlarmMenu>(InitAlarmMenu);
  
  const { data, setReqParams, changeData, hideData }
    = useInfScroll4Widget<IAlarmList>('/api/v1/alert', 'alertResponseList', infScrollRef, InitialAlarmData, {page: 0});

  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 400;
  const x = center - width / 2;
  const adjustedX = window.innerWidth < x + width ? window.innerWidth - width - 16 : x;

  useEffect(() => {
    setReqParams({
      alertType: AlarmCategories[selectedCategory].path,
      page: 0,
    });
  }, [selectedCategory]);

useEffect(() => {
  if (data.alertResponseList.length && !data.alertResponseList.some((v: any) => !!v)) {
    setHasAlarm(data.alertResponseList.slice(10).some((alert: any) => !!alert && !alert.read));
  }
}, [data]);

  function dataIsEmpty(data: any) {
    return !data.alertResponseList.length;
  }

  // @ts-ignore
  return (
    <>
      {isMenuOpened && <AlarmMenu {...AlarmMenuData} setIsMenuOpened={setIsMenuOpened}/> }
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

        <div className='alarm_content_layout'>
          <div className='category_layout_container'>
            <ul className='category_layout'>
              {AlarmCategories.map((category, index) => (
                <li key={category.name}>
                  <button className={selectedCategory === index ? 'selected' : ''}
                          onClick={() => setSelectedCategory(index)}>{category.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='alarm_contents_container'>
            <ul className='alarm_contents'>
              {dataIsEmpty(data) ? (
                  <li><div className='alarm_content read'><p>알림이 없습니다</p></div></li>
                ) :
                data.alertResponseList.map((data: JSX.IntrinsicAttributes & IAlarmContent, index:number) => data && (
                  <AlarmContent key={data.id}
                                {...data}
                                setIsAlarmModalOpened={setIsAlarmModalOpened}
                                setIsMenuOpened={setIsMenuOpened}
                                setAlarmMenuData={setAlarmMenuData}
                                changeData={data => changeData(index, data)}
                                deleteData={() => hideData(index)}/>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

interface IAlarmContent extends IAlarmData{
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
  setIsMenuOpened: (isMenuOpened: boolean) => void;
  setAlarmMenuData: (alarmMenuData: IAlarmMenu) => void;
  changeData: (arg: any) => void;
  deleteData: () => void;
}

function AlarmContent({id, title, createdDate, content, redirectUrl, read, setIsAlarmModalOpened, setIsMenuOpened, setAlarmMenuData, changeData, deleteData} : IAlarmContent) {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  // const [buttenHover, setButtonHover] = useState(false);

  function readAlarm() {
    if (!read)
      Api.fetch(`/api/v1/alert/read/${id}`, 'POST')
        .then(() => changeData((prev: any) => ({...prev, read: true})))
        .catch(err => console.error(err));
  }

  function readAlarmAndClose() {
    readAlarm();
    navigate(redirectUrl);
    setIsAlarmModalOpened(false);
  }

  function deleteAlarm() {
    Api.fetch(`/api/v1/alert/delete/${id}`, 'POST')
      .then(() => deleteData())
      .catch(err => console.error(err));
  }

  function openAlarmMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setAlarmMenuData({
      read,
      readAlarm,
      deleteAlarm,
      target: buttonRef.current,
    });
    setIsMenuOpened(true);
  }

  return (
    <li>
      <div className={'alarm_content' + (read ? ' read' : '')}
           onClick={readAlarmAndClose}>
        <div className='alarm_content_header'>
          <div>
            <h4>{title}</h4>
            <p>{dataGen.getRelativeDate(createdDate)}</p>
          </div>
          <button className='image_button' onClick={openAlarmMenu} ref={buttonRef}>
            <CircleHamburger width={16} height={16}/>
          </button>

        </div>
        <p>{content}</p>
      </div>
    </li>
  );
}

interface IAlarmMenu {
  read: boolean;
  readAlarm: () => void;
  deleteAlarm: () => void;
  target: HTMLElement | null;
  setIsMenuOpened?: (isMenuOpened: boolean) => void;
}

const InitAlarmMenu: IAlarmMenu = {
  read: false,
  readAlarm: () => {},
  deleteAlarm: () => {},
  target: null,
}

function AlarmMenu({read, readAlarm, target, setIsMenuOpened, deleteAlarm}: IAlarmMenu) {
  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 128;
  const height = rect ? rect.height : 0;
  const buttonWidth = rect ? rect.width : 0;
  const x = center - width + buttonWidth/2;
  const y = rect ? rect.bottom - height: 0;

  function clickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    if (setIsMenuOpened)
      setIsMenuOpened(false);
  }

  return (
    <div className='modal_menu_background' onClick={clickOutside}>
      <div className='alarm_content_menu'
           style={{top: y, left: x}}
           onClick={e => e.stopPropagation()}>
        {!read && (
          <button onClick={() =>{
            if (setIsMenuOpened) setIsMenuOpened(false);
            readAlarm();
          }}>
            읽음으로 표시
          </button>
        )}
        <button onClick={() => {
          if (setIsMenuOpened) setIsMenuOpened(false);
          deleteAlarm();
        }}>
          알림 삭제
        </button>
      </div>
    </div>
  )
}

export default AlarmModal;