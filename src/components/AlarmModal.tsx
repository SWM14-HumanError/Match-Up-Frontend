import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Bell from './svgs/Bell.tsx';
import Settings from './svgs/Settings.tsx';
import CloseIcon from './svgs/CloseIcon.tsx';
import CircleHamburger from './svgs/CircleHamburger.tsx';
import {IAlarmData, IAlarmList} from '../constant/interfaces.ts';
import authControl from '../constant/authControl.ts';
import dataGen from '../constant/dateGen.ts';
import Api from '../constant/Api.ts';
import useInfScroll4Widget from "../hooks/useInfScroll4Widget.ts";
import { JSX } from 'react/jsx-runtime';

interface IAlarmModal {
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


// Todo: 알림 모달 스크롤 이상한 오류 고치기
function AlarmModal({setIsAlarmModalOpened, target}: IAlarmModal) {
  const infScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  // const [alarmData, setAlarmData] = useState();
  const {
    data,
    setReqParams
  } = useInfScroll4Widget<IAlarmList>('/api/v1/alert', 'alertResponseList', infScrollRef, InitialAlarmData, {page: 0});

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

  // @ts-ignore
  return (
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
          <button className='svg_button'>
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
            {data.alertResponseList.map((data: JSX.IntrinsicAttributes & IAlarmContent) => data && (
              <AlarmContent key={data.id} {...data} setIsAlarmModalOpened={setIsAlarmModalOpened}/>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface IAlarmContent extends IAlarmData{
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
}

function AlarmContent({id, title, createdDate, content, redirectUrl, read, setIsAlarmModalOpened} : IAlarmContent) {
  const navigate = useNavigate();

  function readAlarm() {
    Api.fetch2Json(`/api/v1/alert/read/${id}`, 'POST')
      .then((res) => {
        setIsAlarmModalOpened(false);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    navigate(redirectUrl)
  }

  return (
    <li>
      <div className={'alarm_content' + (read ? ' read' : '')}
           onClick={readAlarm}>
        <div className='alarm_content_header'>
          <div>
            <h4>{title}</h4>
            <p>{dataGen.getRelativeDate(createdDate)}</p>
          </div>
          <div>
            <CircleHamburger width={16} height={16}/>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </li>
  );
}

export default AlarmModal;