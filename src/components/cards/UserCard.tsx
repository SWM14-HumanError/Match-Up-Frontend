import React from 'react';
import {IUser} from '../../constant/interfaces.ts';
import MemberCard from './MemberCard.tsx';
import authControl from '../../constant/authControl.ts';

import '../../styles/components/UserCard.scss';

interface IUserCard extends IUser{
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserCard(props: IUserCard) {
  const myID = authControl.getUserIdFromToken();
  return ( <MemberCard {...props} myID={myID} approve={true} role='' recruitID={-1} toFeedbackAt='' lastFeedbackAt=''/> )
}

export default UserCard;