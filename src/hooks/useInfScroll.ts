import React, {useEffect, useState} from 'react';
import {IMainFeedsList, IProjectList, IUserCardList} from '../constant/interfaces.ts';
import InfScroll from '../constant/InfScroll.ts';
import Api from '../constant/Api.ts';

const InitialData = {
  size: 0,
  hasNextSlice: true,
}

// page 관리, 데이터 관리 등등을 수행해주면 될 것 같아요, 마치 react-query 같은 느낌으로요
// Todo : Ts 오류 고치기 - 타입 수정
// Todo: DOM 최적화 하기
function useInfScroll<T extends IMainFeedsList|IProjectList|IUserCardList>(
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
  const [isEnded, setIsEnded] = useState(false);

  useEffect( () => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsEnded(!data.hasNextSlice);
  }, [data.hasNextSlice]);

  useEffect(() => {
    handleScroll();
  }, [infScrollLayout?.current?.clientHeight]);

  useEffect(() => {
    // console.log('새로운 데이터 로드 searchParams', searchParams);
    if(triggered) loadMoreData().then();
  }, [triggered]);

  const handleScroll = () => {
    const scrolledHeight = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const componentHeight = infScrollLayout?.current?.clientHeight;
    const scrollThreshold = 32;

    // console.log(scrolledHeight + windowHeight + scrollThreshold, documentHeight);

    if (data.hasNextSlice && (
      scrolledHeight + windowHeight + scrollThreshold >= documentHeight ||
      componentHeight && componentHeight < windowHeight)) {
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

  return {data, loading, isEnded, setReqParams};
}

export default useInfScroll;