import React, {useEffect} from 'react';
import '../styles/components/DialogTemplate.scss';

interface IDialogTemplate {
  isLoading?: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function DialogTemplate({isOpen, setIsOpen, isLoading=false, children}: IDialogTemplate) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return !isOpen ? null : (
    <div className='dialog_background'
         onClick={() => setIsOpen(false)}>
      <div className={isLoading ? 'dialog loading' : 'dialog'}
           onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>

  )
}

export default DialogTemplate;