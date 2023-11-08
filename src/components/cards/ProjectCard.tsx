import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Image from '../../Image.tsx';
import Like from '../svgs/Like.tsx';
import HeartCount from '../svgs/HeartCount.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import StackImage from '../StackImage.tsx';
import useLikeQuery from '../../hooks/useLikeQuery.ts';
import {ITeamProjectSummary} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';
import dataGen from '../../constant/dateGen.tsx';
import Api from '../../constant/Api.ts';

import '../../styles/components/ProjectCard.scss';

interface IProjectCard extends ITeamProjectSummary {
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectCard({id, title, description, thumbnailUrl, techStacks, leaderID, leaderNickname, leaderLevel, isFinished, setLoginDialog}: IProjectCard) {
  const navigate = useNavigate();

  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const {like, likeCount, setLike} = useLikeQuery(id => `/api/v1/team/${id}/like`, id, likes, liked);
  
  const myID = authControl.getUserIdFromToken();
  
  useEffect(() => {
    if (myID === 0) return;

    Api.fetch2Json(`/api/v1/team/${id}/like`)
      .then(res => {
        const {check, totalLike} = res;
        const count = parseInt(totalLike);
        setLiked(check);
        setLikes(isNaN(count) ? 0 : count);
      })
      .catch(err => console.error(err));
  }, []);

  function clickLike(e: React.MouseEvent | Event) {
    e.stopPropagation();
    if (myID === 0) setLoginDialog(true);
    else setLike(prev => !prev);

  }

  return (
    <div className='project_card' onClick={() => navigate(`/team/${id}`)}>
      <Image src={thumbnailUrl} dummyTitle={title} isFinished={isFinished}/>

      <div className='info_layout'>
        <div className='project_info_detail_layout'>
          <div className='name_layout'>
            <h3>{title}</h3>
            <button className='image_button' onClick={clickLike}>
              <Like enable={like}/>
            </button>
          </div>

          <p>{description}</p>

          { techStacks.length > 0 && (
            <>
              <h4>프로젝트 스택</h4>
              <ul>
                {dataGen.getUniqueTechStacks(techStacks).slice(0, 12).map((stack, index) => (
                  <li key={index}><StackImage stack={stack}/></li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className='project_user_layout'>
          <div className='user_layout'
               onClick={event => {
                  event.stopPropagation();
                  navigate(`/profile/${leaderID}`);
               }}>
            <TierSvg width={20} height={20} tier={leaderLevel}/>
            <p>{leaderNickname}</p>
          </div>

          <HeartCount count={likeCount}/>
        </div>

      </div>
    </div>
  );
}

export default ProjectCard;