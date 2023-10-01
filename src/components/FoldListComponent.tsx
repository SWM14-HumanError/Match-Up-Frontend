import React, {useState} from 'react';
import RightArrow from './svgs/RightArrow.tsx';

interface IFoldListComponent {
  title: string;
  children?: React.ReactNode;
}
function FoldListComponent({title, children}: IFoldListComponent) {
  const [isFold, setIsFold] = useState<boolean>(true);

  return (
    <li>
      <div className='fold_action_layout'
           onClick={() => setIsFold(prev => !prev)}>
        <h2>{title}</h2>
        <button className='image_button'>
          <RightArrow width={8} height={16} rotate={isFold ? 0 : 90}/>
        </button>
      </div>

      { !isFold && (
        <div className='fold_content_layout'>
          {children}
        </div>
      )}
    </li>
  );
}

export default FoldListComponent;