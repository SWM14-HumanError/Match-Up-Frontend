import React from 'react';
import DialogTemplate from './DialogTemplate.tsx';

interface IBrowserDialog {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BrowserDialog({isOpen, setIsOpen}: IBrowserDialog) {
  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='dialog_content'>
        <iframe src='https://www.twitter.com'></iframe>
      </div>
    </DialogTemplate>
  );
}

export default BrowserDialog;