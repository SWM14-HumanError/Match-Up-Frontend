import {useState} from 'react';
import {ISimpleTechStack, ITechStack} from '../constant/interfaces.ts';
import stackList from '../constant/stackList.ts';

interface IStackImage {
  stack: ISimpleTechStack | ITechStack;
  hasTooltip?: boolean;
}

// Todo: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.json
// Todo: Stack Image 찾는 알고리즘 개선 - URL 접근 순서 여러개로 결정 + localstorage 요청 저장
function StackImage({stack, hasTooltip=true}: IStackImage) {
  const normalizedStack = stack.tagName.toLowerCase().replace(/\./g, '');
  const stackUrl = getStackUrl(stack);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    stackUrl != null ?
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${stackUrl}.svg` :
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
      <span className={hasTooltip && isHover ? 'visible' : ''}>{stack.tagName}</span>
    </div>
  );
}

function getStackUrl (stack: IStackImage['stack']) {
  if (!!stack.url) return stack.url;

  const normalizedStack = stack.tagName.toLowerCase().replace(/\./g, '');
  const searchedStacks = stackList.filter(stack => stack.tagName === normalizedStack);
  if (searchedStacks.length > 0)
    return searchedStacks[0].url;

  return null;
}

export default StackImage;