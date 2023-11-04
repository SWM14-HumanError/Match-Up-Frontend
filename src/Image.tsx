import {useEffect, useState} from 'react';

interface IImage {
  className?: string;
  src: string|null;
  dummyTitle: string;
}

function Image({className='', src, dummyTitle}: IImage) {
  const [imgSrc, setImgSrc] = useState<string|null>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return !!src ? (
    <img className={className}
         src={imgSrc ?? ''}
         referrerPolicy='no-referrer'
         onError={() => setImgSrc(null)}
         alt=''/>
  ) : (
    <div className={`no_image ${className ?? ''}`}>
      <h2>{dummyTitle}</h2>
    </div>
  );
}

export default Image;