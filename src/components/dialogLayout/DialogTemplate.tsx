import React, {useEffect, useState} from 'react';
import '@styles/components/DialogTemplate.scss';

interface IDialogTemplate {
  isLoading?: boolean;
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  children: React.ReactNode;
}

function DialogTemplate({isOpen, setIsOpen, isLoading=false, children}: IDialogTemplate) {
  const [overflow, setOverflow] = useState<string>('auto');

  // console.log('DialogTemplate', isOpen, isLoading);
  // Fixme: MentorDialog에서 isOpen이 링크가 바뀌면서 계속 열리는 문제 해결하기

  useEffect(() => {
    if (isOpen) {
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
    }
  }, [isOpen]);

  return !isOpen ? null : (
    <div className='dialog_background'
         onClick={() => setIsOpen(false)}>
      <div className={isLoading ? 'dialog loading' : 'dialog'} role='dialog' aria-modal='true'
           onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>

  )
}

export default DialogTemplate;