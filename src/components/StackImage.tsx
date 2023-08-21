import {useState} from 'react';
import {ISimpleTechStack, ITechStack} from '../constant/interfaces.ts';

interface IStackImage {
  stack: ISimpleTechStack | ITechStack;
}

function StackImage({stack}: IStackImage) {
  const normalizedStack = stack.tagName.toLowerCase().replace(/\./g, '');
  const [isHover, setIsHover] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    stack.url != null ?
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${stack.url}.svg` :
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-original.svg`);

  function loadOtherImage() {
    setUrl(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-plain.svg`);
  }

  return (
    <div className='stack_layout'
         onClick={e => e.stopPropagation()}>
      <img src={url}
           onError={loadOtherImage}
           alt={stack.tagName}
           onMouseEnter={() => setIsHover(true)}
           onMouseLeave={() => setIsHover(false)}/>
      <span className={isHover ? 'visible' : ''}>{stack.tagName}</span>
    </div>
  );
}

export default StackImage;