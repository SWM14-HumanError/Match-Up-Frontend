import {useEffect, useState} from 'react';
import Api from '../constant/Api.ts';

function useLikeQuery(
  getApiUrl: (id: number) => string,
  id: number,
  likes: number,
  liked: boolean
) {
  const [like, setLike] = useState(liked);
  const [prevLike, setPrevLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(likes - Number(liked) + Number(like));
  }, [likes, liked, like]);

  useEffect(() => {
    setLike(liked);
    setPrevLike(liked);
  }, [liked]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (prevLike === like) return;

      setPrevLike(like);
      if (like) {
        Api.fetch(getApiUrl(id), 'POST').then();
      } else {
        Api.fetch(getApiUrl(id), 'DELETE').then();
      }
    }, 700);

    return () => clearTimeout(debounceTimer);
  }, [like]);

  return {like, likeCount, setLike};
}

export default useLikeQuery;