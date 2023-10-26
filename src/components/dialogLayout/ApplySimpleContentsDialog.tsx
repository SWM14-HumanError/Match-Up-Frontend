import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import '../../styles/dialogs/ApplyDialog.scss';

interface IApplyDialog {
  titleString: string;
  typeString: string;
  clickFunc: (comment: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplySimpleContentsDialog({titleString, typeString, clickFunc, isOpen, setIsOpen}: IApplyDialog) {
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setComment('');
  }, [isOpen]);

  function onClickFunction() {
    clickFunc(comment);
    setIsOpen(false);
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={false}>
        <div className='apply_dialog apply_deny_contents_dialog' style={{minWidth: 380}}>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>{titleString}</span>
              <h3>{typeString}하기</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content'>
            <h4>{typeString} 이유</h4>
            <textarea value={comment}
                      maxLength={19}
                      onChange={e => setComment(e.target.value)} />
          </div>

          <div className='dialog_footer fill'>
            <button onClick={onClickFunction} disabled={!comment}>
              {typeString}하기
            </button>
            <button className='cancel'
                    onClick={() => setIsOpen(false)}>
              취소하기
            </button>
          </div>
        </div>
    </DialogTemplate>
  );
}

export default ApplySimpleContentsDialog;