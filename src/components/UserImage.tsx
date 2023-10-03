import {useEffect, useState} from 'react';
import userNone from '../../assets/userNone.svg';

function UserImage({profileImageURL}: {profileImageURL: string|null}) {
  const [userImage, setUserImage] = useState<string|null>(profileImageURL);

  useEffect(() => {
    setUserImage(profileImageURL);
  }, [profileImageURL]);

  function loadOtherImage() {
    setUserImage(null);
  }

  return !!userImage ? (
    <img className='border'
         onError={loadOtherImage}
         referrerPolicy='no-referrer'
         src={userImage}
         alt='user image'/>
  ) : (
    <img src={userNone} alt='user image'/>
  );
}

export default UserImage;