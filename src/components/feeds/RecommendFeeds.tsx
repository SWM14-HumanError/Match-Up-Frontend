import {useEffect, useState} from 'react';
import MainFeedCard from '@components/cards/MainFeedCard.tsx';
import {feeds as feedsDummy} from '@/dummies/dummyData.ts';
import {IMainFeedsList} from '@constant/interfaces.ts';
import Api from '@constant/Api.ts';

interface IRecommendFeeds {
  userNickname: string|null;
  setLoginDialog: (open: boolean) => void;
}

const InitFeeds: IMainFeedsList = {feedSearchResponses: [], size: 0, hasNextSlice: false};

function RecommendFeeds({userNickname, setLoginDialog}: IRecommendFeeds) {
  const [feeds, setFeeds] = useState<IMainFeedsList>(InitFeeds);

  useEffect(() => {
    if (!userNickname) return;

    Api.fetch2Json(`/api/v1/feeds?searchType=WRITER&searchValue=${userNickname}&page=0page=0`)
      .then((data) => {
        setFeeds(data);
      }).catch((err) => {
      console.error(err);
      setFeeds(Api.isLocalhost() ? feedsDummy : InitFeeds);
    });
  }, [userNickname]);

  return (
    <div
      className={'card_layout' + (!feeds.feedSearchResponses.length || !feeds.feedSearchResponses[0] ? ' no_contents' : '')}>
      <div>
        {!feeds.feedSearchResponses.length || !feeds.feedSearchResponses[0] ? (
            <div className='list_no_contents'>
              <p>피드가 없습니다</p>
            </div>
          ) :
          feeds.feedSearchResponses.slice(0, 6).map((feed: any | null | undefined) => feed && (
            <MainFeedCard key={feed.id}
                          {...feed}
                          setLoginDialog={setLoginDialog}/>
          ))}
      </div>
    </div>
  );
}

export default RecommendFeeds;