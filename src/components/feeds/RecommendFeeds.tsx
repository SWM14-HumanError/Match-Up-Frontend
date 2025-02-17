import React, {useEffect, useState} from 'react';
import MainFeedCard from '@components/cards/MainFeedCard.tsx';
import {feeds as feedsDummy} from '@/dummies/dummyData.ts';
import {IMainFeeds, IMainFeedsList} from '@constant/interfaces.ts';
import Api from '@constant/Api.ts';

interface IRecommendFeeds {
  userNickname: string | null;
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
  excludeIds?: number[];
  count?: number;
}

const InitFeeds: IMainFeedsList = {feedSearchResponses: [], size: 0, hasNextSlice: false};

function RecommendFeeds({userNickname, setLoginDialog, excludeIds = [], count = 6}: IRecommendFeeds) {
  const [feeds, setFeeds] = useState<IMainFeedsList>(InitFeeds);
  const filteredFeeds = feeds.feedSearchResponses.filter((feed) => feed && !excludeIds.includes(feed.id)).slice(0, count);
  const noContents = !filteredFeeds.length || !filteredFeeds[0];

  useEffect(() => {
    if (!userNickname) return;

    const size = count + excludeIds.length;
    Api.fetch2Json(`/api/v1/feeds?searchType=WRITER&searchValue=${userNickname}&size=${size}&page=0`)
      .then((data) => {
        setFeeds(data);
      }).catch((err) => {
      console.error(err);
      setFeeds(Api.isLocalhost() ? feedsDummy : InitFeeds);
    });
  }, [userNickname]);

  return (
    <div
      className={'card_layout' + (noContents ? ' no_contents' : '')}>
      <div>
        {noContents ? (
            <div className='list_no_contents'>
              <p>피드가 없습니다</p>
            </div>
          ) :
          filteredFeeds.map((feed: IMainFeeds | null | undefined) => feed && (
            <MainFeedCard key={feed.id}
                          {...feed}
                          setLoginDialog={setLoginDialog}/>
          ))}
      </div>
    </div>
  );
}

export default RecommendFeeds;