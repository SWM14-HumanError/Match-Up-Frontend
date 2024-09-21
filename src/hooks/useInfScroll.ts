import React, {useEffect, useMemo, useRef, useState} from 'react';
import {InfScrollAdapter} from '@constant/InfScrollAdapter.ts';
import {InfList, SearchParams} from '@constant/interfaces.ts';
import InfScroll from '@constant/InfScroll.ts';
import Api from '@constant/Api.ts';

const InitialData = {
  list: [],
  size: 0,
  hasNextSlice: true,
}

export const DEFAULT_PAGE_SIZE = 20; // 한 페이지에 보여줄 데이터 개수

// page 관리, 데이터 관리 등등을 수행해주면 될 것 같아요, 마치 react-query 같은 느낌으로요
// Todo: infinite scroll 파일 통합하기 (useInfScroll4Widget.ts, useRevInfScroll4Widget.ts)
// useInfScroll4Widget.ts -> 스크롤 하는 컴포넌트가 window가 아닌 경우
// Todo: DOM 최적화 하기 - react window 사용하기
function useInfScroll<U, T>(
  adapter: InfScrollAdapter<U, T>,
  infScrollLayout: React.RefObject<HTMLDivElement>
) {
  const page = useRef<number>(0);
  const searchParams = useRef<SearchParams>(adapter.DefaultParams);
  const [data, setData] = useState<InfList<T>>(InitialData);
  const [loading, setLoading] = useState(false);
  const isEmpty = useMemo(() =>  !data.list.length || !data.list.some((v) => v), [data.list]);
  const isEnded = !data.hasNextSlice;

  // console.log('useInfScrollUsingAdapter', loading, isEnded, isEmpty, page.current, searchParams.current);

  // Todo: 초기 렌더링 시에 여러번 호출되는 문제 해결하기
  // 화면 크기가 클 때, 무한스크롤 생기도록 설정
  useEffect(() => {
    if (infScrollLayout.current)
      handleScroll();
  }, [infScrollLayout.current?.clientHeight]);

  useEffect(() => {
    if (!isEnded)
      window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isEnded, loading]);

  const handleScroll = () => {
    const scrolledHeight = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const componentHeight = infScrollLayout?.current?.clientHeight;
    const scrollThreshold = 32;

    // console.log(scrolledHeight + windowHeight + scrollThreshold, documentHeight);

    if (scrolledHeight + windowHeight + scrollThreshold >= documentHeight ||
      componentHeight && componentHeight < windowHeight) {
      if (!loading)
        loadMoreData().then();
    }
  };

  const setSearchParams = (params: SearchParams) => {
    let {page: newPage, ...newSearchParams} = params;
    newSearchParams = {...adapter.DefaultParams, ...newSearchParams};

    if (newPage !== undefined)
      page.current = Number(newPage);

    searchParams.current = newSearchParams;
  }

  async function loadMoreData() {
    // console.log('loadData', page.current, searchParams.current, loading);
    if (loading || isEnded) return; // 이미 로딩 중이면 중복 호출 방지

    const curPage = page.current;
    const params = {...searchParams.current, page: curPage};

    setLoading(true);
    try {
      const newData = adapter.transform(
        await Api.fetch2Json(adapter.ApiUrl + '?' + InfScroll.getParamString(params))
      );
      const startArrIndex = DEFAULT_PAGE_SIZE * curPage;
      const ArrSize = startArrIndex + newData.size;

      setData((prevData) => ({
        list:
          InfScroll.getExpandArray(
            prevData.list,
            newData.list,
            startArrIndex, ArrSize),
        size: ArrSize,
        hasNextSlice: newData.hasNextSlice
      }));
    } catch (e) {
      console.error(e, data.hasNextSlice);

      setData((prevData) => ({
        list: !prevData.list.length ? Api.isLocalhost() ? adapter.DummyData : [] : prevData.list,
        size: prevData.size + 1,
        hasNextSlice: false
      }));
    } finally {
      setLoading(false);
      page.current = curPage + 1;
    }
  }

  function changeData(index: number, newData: T) {
    if (index < 0) return;

    setData((prev) => ({
      ...prev,
      list: prev.list.map((v, i) => i === index ? newData : v),
    }));
  }

  function hideData(index: number) {
    if (index < 0) return;

    setData((prev) => ({
      ...prev,
      list: prev.list.map((v, i) => i === index ? null : v),
    }));
  }

  function setReqParams(params: SearchParams) {
    setLoading(false);
    setData(InitialData);
    page.current = 0;
    setSearchParams(params);
    loadMoreData().then();
  }

  return {data, loading, isEnded, isEmpty, setReqParams, changeData, hideData};
}

export default useInfScroll;