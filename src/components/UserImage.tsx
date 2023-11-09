import {useEffect, useState} from 'react';
import userNone from '../../assets/userNone.svg';

function UserImage({profileImageURL, isAvailableUser}: { profileImageURL: string | null, isAvailableUser: boolean }) {
  const [userImage, setUserImage] = useState<string | null>(profileImageURL);

  useEffect(() => {
    setUserImage(profileImageURL);
  }, [profileImageURL]);

  function loadOtherImage() {
    setUserImage(null);
  }

  return isAvailableUser ? !!userImage ? (
    <img className='border'
         onError={loadOtherImage}
         referrerPolicy='no-referrer'
         src={userImage}
         alt='user image'/>
  ) : (
    <img src={userNone} alt='user image'/>
  ) : (
    <img src={userNone} alt='user image' style={{rotate: '180'}}/>
  );
}

export default UserImage;