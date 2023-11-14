import {useEffect, useState} from 'react';

function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 창 크기 변경 시 이벤트 핸들러 등록
    window.addEventListener('resize', handleResize);
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);
  
  return {isMobile};
}

export default useMobile;