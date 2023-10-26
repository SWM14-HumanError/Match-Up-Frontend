import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import '../../styles/dialogs/ApplyDialog.scss';

interface IApplyDialog {
  denyVerify: (comment: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyDenyContentsDialog({denyVerify, isOpen, setIsOpen}: IApplyDialog) {
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    setComment('');
  }, [isOpen]);

  function onClickDeny() {
    denyVerify(comment);
    setIsOpen(false);
  }

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={false}>
        <div className='apply_dialog apply_deny_contents_dialog' style={{minWidth: 380}}>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>멘토</span>
              <h3>거절하기</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content'>
            <h4>거절 이유</h4>
            <textarea value={comment}
                      maxLength={19}
                      onChange={e => setComment(e.target.value)} />
          </div>

          <div className='dialog_footer fill'>
            <button onClick={onClickDeny} disabled={!comment}>
              거절하기
            </button>
            <button className='cancel'
                    onClick={() => setIsOpen(false)}>
              취소
            </button>
          </div>
        </div>
    </DialogTemplate>
  );
}

export default ApplyDenyContentsDialog;