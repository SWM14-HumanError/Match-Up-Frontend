import React, {useState} from 'react';
import RightArrow from './svgs/RightArrow.tsx';

interface DetailToggleBoxProps {
  title: string;
  buttonName?: string;
  onClick?: () => void;
  children: React.ReactNode;
  buttonDisabled?: boolean;
}
function DetailToggleBox({ title, buttonName, onClick, children, buttonDisabled }: DetailToggleBoxProps) {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <div className='detail_toggle_box'>
      <div className='detail_header'>
        <div>
          <h2 id={title}>{title}</h2>
          <button className='image_button' aria-label={isToggle ? `${title} 접기` : `${title} 펼치기`}
                  onClick={() => setIsToggle(prev => !prev)}>
            <RightArrow width={8} height={16} rotate={isToggle ? 0 : 90}/>
          </button>
        </div>

        <div className='button_layout'>
          {buttonName &&
            <button onClick={onClick}
                    disabled={buttonDisabled}>
              {buttonName}
            </button>
          }
        </div>
      </div>

      {!isToggle &&
        <div className='detail_contents'>
          {children}
        </div>
      }
    </div>
  );
}

export default DetailToggleBox;