import {useState} from 'react';
import * as Sentry from '@sentry/browser';
import {ISimpleTechStack, ITechStack} from '@constant/interfaces.ts';
import stackList from '@constant/stackList.ts';

interface IStackImage {
  stack: ISimpleTechStack | ITechStack;
  hasTooltip?: boolean;
}

function StackImage({stack, hasTooltip=true}: IStackImage) {
  const normalizedStack = stack.tagName.toLowerCase().replace(/\./g, '');
  const stackUrl = getStackUrl(stack);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    stackUrl != null ? stackUrl :
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-original.svg`);

  function loadOtherImage() {
    Sentry.captureException(new Error(`스택 이미지를 불러오지 못했습니다. 스택명: ${stack.tagName}`));
    // setUrl(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-plain.svg`);
    setUrl('/ImageNotFound.svg');
  }

  return (
    <div className='stack_layout'
         onClick={e => e.stopPropagation()}>
      <img src={url}
           onError={loadOtherImage}
           alt={stack.tagName}
           onMouseEnter={() => setIsHover(true)}
           onMouseLeave={() => setIsHover(false)}/>
      { hasTooltip && (
        <span className={isHover ? 'visible' : ''}>{stack.tagName}</span>
      )}
    </div>
  );
}

function getStackUrl(stack: IStackImage['stack']) {
  if (!!stack.url) return stack.url;

  const normalizedStackName = stack.tagName.toLowerCase().replace(/\./g, '');
  const searched = stackList.find(stack => stack.tagName === normalizedStackName);

  if (searched)
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${searched.tagName}/${searched.tagName}-${searched.svg}.svg`;

  return null;
}

export default StackImage;