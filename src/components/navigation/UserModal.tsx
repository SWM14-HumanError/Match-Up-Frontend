import UserLayout from './UserLayout.tsx';

interface IUserModal {
  setIsUserModalOpened: (isUserModalOpened: boolean) => void;
  target: HTMLElement | null;
}

function UserModal({setIsUserModalOpened, target}: IUserModal) {
  const rect = target?.getBoundingClientRect();
  const center = rect ? (rect?.left + rect?.right) / 2 : 0;
  const width = 400;
  const x = center - width / 2;
  const adjustedX = window.innerWidth < x + width ? window.innerWidth - width - 16 : x;

  return (
    <div className='modal_background user_modal'
         style={{left: adjustedX}}
         onClick={e => e.stopPropagation()}>
      <UserLayout closeUserModal={() => setIsUserModalOpened(false)}/>
    </div>
  );
}

export default UserModal;