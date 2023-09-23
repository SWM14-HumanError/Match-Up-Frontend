import {useEffect, useState} from 'react';
import Api from '../constant/Api.ts';

function useLikeQuery(
  type: string,
  id: number,
  liked: boolean
) {
  const [like, setLike] = useState(liked);
  const [prevLike, setPrevLike] = useState(liked);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    Api.fetch(`/api/v1/${type}/${id}/like`)
      .then(res => res?.text())
      .then(count => setLikeCount(isNaN(Number(count)) ? -1 : Number(count)))
      .catch(() => setLikeCount(-1));
  }, [id]);

  useEffect(() => {
    setLike(liked);
    setPrevLike(liked);
  }, [liked]);

  useEffect(() => {
    setLikeCount(likeCount + (like ? 1 : -1));

    const debounceTimer = setTimeout(() => {
      if (prevLike === like) return;

      setPrevLike(like);
      if (like) {
        Api.fetch2Json(`/api/v1/${type}/${id}/like`, 'POST').then();
      } else {
        Api.fetch2Json(`/api/v1/${type}/${id}/like`, 'DELETE').then();
      }
    }, 700);

    return () => clearTimeout(debounceTimer);
  }, [like]);

  return {like, likeCount, setLike};
}

export default useLikeQuery;