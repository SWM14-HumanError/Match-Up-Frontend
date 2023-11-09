import {useEffect, useState} from 'react';

interface IImage {
  className?: string;
  src: string|null;
  dummyTitle: string;
  isFinished?: 0|1;
}

function Image({className='', src, dummyTitle, isFinished=0}: IImage) {
  const [imgSrc, setImgSrc] = useState<string|null>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className='thumbnail_image_container'>
      {!!src ? (
        <img className={className}
             src={imgSrc ?? ''}
             referrerPolicy='no-referrer'
             onError={() => setImgSrc(null)}
             alt=''/>
      ) : (
        <div className={`no_image ${className ?? ''}`}>
          <h2>{dummyTitle}</h2>
        </div>
      )}

      {!!isFinished && (
        <div className='thumbnail_filter_layout finished_filter'>
          <span>모집 완료</span>
        </div>
      )}
    </div>
  );
}

export default Image;