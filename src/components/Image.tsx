import React, {useLayoutEffect, useState} from 'react';

interface IImage {
  className?: string;
  src: string|null;
  dummyTitle: string;
  isFinished?: 0|1;
  children?: React.ReactNode;
}

function Image({className='', src, dummyTitle, isFinished=0, children}: IImage) {
  const [isError, setIsError] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsError(false);
  }, [src]);

  return (
    <div className='thumbnail_image_container'>
      {!!src && !isError ? (
        <img className={className}
             src={src}
             referrerPolicy='no-referrer'
             onError={() => setIsError(true)}
             alt=''/>
      ) : (
        <div className={`no_image ${className ?? ''}`}>
          <h2>{dummyTitle}</h2>
        </div>
      )}

      <div className={'thumbnail_filter_layout' + (!!isFinished ? ' finished_filter' : '')}>
        {children}
        {!!isFinished && (<span>모집 완료</span>)}
      </div>

    </div>
  );
}

export default Image;