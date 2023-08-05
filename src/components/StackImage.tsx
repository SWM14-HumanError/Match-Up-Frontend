import {useState} from 'react';

function StackImage({stack}: IStackImage) {
  const normalizedStack = stack.toLowerCase().replace(/\./g, '');
  const [url, setUrl] = useState<string>(
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-original.svg`);

  function loadOtherImage() {
    setUrl(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalizedStack}/${normalizedStack}-plain.svg`);
  }

  return (
    <div className='stack_layout'>
      {/*<img src={`/assets/stacks/${stack}.png`} alt={stack}/>*/}
      <img src={url}
           onError={loadOtherImage}
           alt={stack}/>
      <span>{stack}</span>
    </div>
);
}

interface IStackImage {
  stack: string;
}

export default StackImage;