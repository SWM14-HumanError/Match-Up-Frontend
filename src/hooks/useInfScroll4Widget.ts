import React, {useEffect, useState} from 'react';
import InfScroll from '../constant/InfScroll.ts';
import Api from '../constant/Api.ts';

const InitialData = {
  size: 0,
  hasNextSlice: true,
}

// page 관리, 데이터 관리 등등을 수행해주면 될 것 같아요, 마치 react-query 같은 느낌으로요
// Todo : Ts 오류 고치기 - 타입 수정
// Todo: DOM 최적화 하기
function useInfScroll4Widget<T>(
  apiUrl: string,
  arrayTag: string, //'userCardResponses'|'teamSearchResponseList'|'feedSearchResponses',
  infScrollLayout: React.RefObject<HTMLDivElement>,
  dummyData: any|T,
  defaultParams:object|undefined) {

  const DefaultPageSize = 10;

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ page:0, ...defaultParams });
  const [triggered, setTriggered] = useState(false);
  const [data, setData] = useState<object|any|T>({ ...InitialData, [arrayTag]: [] });

  useEffect( () => {
    if (!infScrollLayout?.current) return;

    infScrollLayout.current?.addEventListener('scroll', handleScroll);
    return () => {
      infScrollLayout.current?.removeEventListener('scroll', handleScroll);
    };
  }, [infScrollLayout?.current]);

  useEffect(() => {
    handleScroll();
  }, [infScrollLayout?.current?.clientHeight]);

  useEffect(() => {
    // console.log('새로운 데이터 로드 searchParams', searchParams);
    if(triggered) loadMoreData().then();
    else handleScroll();
  }, [triggered]);

  const handleScroll = () => {
    const container = infScrollLayout.current;
    if (!container) return;

    // 스크롤 위치와 컴포넌트의 높이 및 스크롤 가능한 높이 확인
    const parent = container.parentElement;
    const { scrollTop, clientHeight, scrollHeight } = container;
    const scrollThreshold = 32;

    if (data.hasNextSlice && (scrollTop + clientHeight >= scrollHeight - scrollThreshold ||
        parent && scrollHeight < parent.clientHeight + scrollThreshold)) {
      if (!loading)
        setTriggered(true);
    }
  };

  async function loadMoreData() {
    // console.log('loadMoreData', searchParams.page);
    if (loading) return; // 이미 로딩 중이면 중복 호출 방지
    if (!data.hasNextSlice) {
      setTriggered(false);
      return;
    }

    setLoading(true);
    try {
      const newData :any = await Api.fetch2Json(apiUrl + '?' + InfScroll.getParamString(searchParams));

      const startArrIndex = DefaultPageSize * searchParams.page;
      const ArrSize = startArrIndex + newData.size;

      setData((prevData: { [x: string]: any[]; }) => ({
        [arrayTag]:
          InfScroll.getExpandArray(
            prevData[arrayTag],
            newData[arrayTag],
            startArrIndex, ArrSize),
        size: ArrSize,
        hasNextSlice: newData.hasNextSlice
      }));
    }
    catch (e) {
      console.error(e, data.hasNextSlice);

      setData((prevData: { [x: string]: any; size: number; }) => ({
        [arrayTag]: !prevData[arrayTag].length ? dummyData[arrayTag] : prevData[arrayTag],
        size: prevData.size + 1,
        hasNextSlice: false
      }));
    }
    finally {
      setLoading(false);
      setSearchParams(prevParams => ({...prevParams, page: prevParams.page + 1}));
      setTriggered(false);
    }
  }

  function setReqParams(params: { [key: string]: any }) {
    console.log('setReqParams', params);
    setLoading(false);
    setSearchParams({...params, page: 0});
    setTriggered(true);
    setData({...InitialData, [arrayTag]: []});
  }

  return {data, loading, setReqParams};
}

export default useInfScroll4Widget;