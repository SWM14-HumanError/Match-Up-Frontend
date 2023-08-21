import {IUser} from '../../constant/interfaces.ts';
import MemberCard from './MemberCard.tsx';

import '../../styles/components/UserCard.scss';

function UserCard(props: IUser) {
  return ( <MemberCard {...props} approve={true} role=''/> )
}

export default UserCard;