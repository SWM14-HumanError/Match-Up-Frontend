import Bell from './svgs/Bell.tsx';
import Settings from './svgs/Settings.tsx';
import CloseIcon from './svgs/CloseIcon.tsx';
import CircleHamburger from './svgs/CircleHamburger.tsx';
import {useState} from 'react';

interface IAlarmModal {
  setIsAlarmModalOpened: (isAlarmModalOpened: boolean) => void;
}

const AlarmCategories = [
  {
    name: '전체',
    path: '/all',
  },
  {
    name: '모임',
    path: '/meeting',
  },
  {
    name: '멘토링',
    path: '/mentoring',
  },
];

function AlarmModal({setIsAlarmModalOpened}: IAlarmModal) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className='modal_background alarm_modal'
         onClick={e => e.stopPropagation()}>
      <div className='alarm_header_layout'>
        <div className='header_title_layout'>
          <Bell width={28} height={28} state={0}/>
          <h3>알림</h3>
        </div>

        <div className='header_button_layout'>
          <button className='link'>로그아웃</button>
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
        <ul className='category_layout'>
          {AlarmCategories.map((category, index) => (
            <li key={category.name}>
              <button className={selectedCategory === index ? 'selected' : ''}
                      onClick={() => setSelectedCategory(index)}>{category.name}</button>
            </li>
          ))}
        </ul>
        <ul className='alarm_contents'>
          <li>
            <div className='alarm_content'>
              <div className='alarm_content_header'>
                <div>
                  <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='user_image'/>
                  <h4>맛집탐방 어플</h4>
                  <p>10분 전</p>
                </div>
                <div>
                  <CircleHamburger width={16} height={16}/>
                </div>
              </div>
              <p>지원해주셔서 감사합니다! 같이 일하고 싶습니다. <br/> 따로 추가적인 질문이나 협의는 메세지로 따로 알려드리겠습니다!</p>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default AlarmModal;