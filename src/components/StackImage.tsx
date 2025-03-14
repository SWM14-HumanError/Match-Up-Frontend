import {useState} from 'react';
import * as Sentry from '@sentry/browser';
import {ISimpleTechStack, ITechStack} from '@constant/interfaces.ts';
import stackList from '@constant/stackList.ts';
import {DefaultStack} from '@constant/initData.ts';

interface IStackImage {
  stack: ISimpleTechStack | ITechStack;
  hasTooltip?: boolean;
}

function StackImage({stack, hasTooltip=true}: IStackImage) {
  const normalizedStack = stack.tagName.toLowerCase().replace(/\./g, '');
  const stackUrl = getStackUrl(stack);

  const [url, setUrl] = useState<string>(
    stackUrl != null ? stackUrl :
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-original.svg`);

  function loadOtherImage() {
    Sentry.captureException(new Error(`스택 이미지를 불러오지 못했습니다. 스택명: ${stack.tagName}`));
    // setUrl(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-plain.svg`);
    setUrl('/ImageNotFound.svg');
  }

  return (
    <div className='stack_layout'>
      <img src={url}
           alt={stack.tagName}
           onError={loadOtherImage}
           onClick={e => e.stopPropagation()} />
      { hasTooltip && (
        <span>{stack.tagName}</span>
      )}
    </div>
  );
}

function getStackUrl(stack: IStackImage['stack']) {
  if (stack.url) return stack.url;

  if ('tagID' in stack && stack.tagID === DefaultStack.tagID) {
    return '/ImageNotFound.svg';
  }

  const normalizedStackName = stack.tagName.toLowerCase().replace(/\./g, '');
  const searched = stackList.find(stack => stack.tagName === normalizedStackName);

  if (searched)
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${searched.tagName}/${searched.tagName}-${searched.svg}.svg`;

  return null;
}

export default StackImage;