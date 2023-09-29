import {IUser} from '../../constant/interfaces.ts';
import MemberCard from './MemberCard.tsx';

import '../../styles/components/UserCard.scss';

function UserCard(props: IUser) {
  return ( <MemberCard {...props} approve={true} role='' recruitID={-1}/> )
}

export default UserCard;