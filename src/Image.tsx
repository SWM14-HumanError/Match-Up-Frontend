import {useEffect, useState} from 'react';

interface IImage {
  src: string|null;
  dummyTitle: string;
}

function Image({src, dummyTitle}: IImage) {
  const [imgSrc, setImgSrc] = useState<string|null>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return !!src ? (
    <img src={imgSrc ?? ''}
         referrerPolicy='no-referrer'
         onError={() => setImgSrc(null)}
         alt=''/>
  ) : (
    <div className='no_image'>
      <h2>{dummyTitle}</h2>
    </div>
  );
}

export default Image;