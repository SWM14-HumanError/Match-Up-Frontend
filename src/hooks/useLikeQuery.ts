import {useEffect, useState} from 'react';
import Api from '../constant/Api.ts';

function useLikeQuery(
  type: string,
  id: number,
  likes: number,
  liked: boolean
) {
  const [like, setLike] = useState(liked);
  const [prevLike, setPrevLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(likes - Number(liked));
  }, [likes]);

  useEffect(() => {
    setLike(liked);
    setPrevLike(liked);
  }, [liked]);

  useEffect(() => {
    setLikeCount(likes - Number(liked) + Number(like));

    const debounceTimer = setTimeout(() => {
      if (prevLike === like) return;

      setPrevLike(like);
      if (like) {
        Api.fetch(`/api/v1/${type}/${id}/like`, 'POST').then();
      } else {
        Api.fetch(`/api/v1/${type}/${id}/like`, 'DELETE').then();
      }
    }, 700);

    return () => clearTimeout(debounceTimer);
  }, [like]);

  return {like, likeCount, setLike};
}

export default useLikeQuery;