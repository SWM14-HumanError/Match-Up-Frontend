import React, {useState} from 'react';

interface IProps {
  children: React.ReactNode;
  text: string;
}
function Tooltip({ children, text }: IProps) {
  const [isHover, setIsHover] = useState(false);
  
  return (
    <div className='tooltip_container' style={{display: 'inline-block'}}>
      <div style={{display: 'inline-block'}}
           onMouseEnter={() => setIsHover(true)}
           onMouseLeave={() => setIsHover(false)}>
        {children}
      </div>
      <span className={isHover ? 'visible' : 'invisible'}>{text}</span>
    </div>
  )
}

export default Tooltip;