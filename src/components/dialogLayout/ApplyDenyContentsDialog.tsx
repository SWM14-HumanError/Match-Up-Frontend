import React, {useEffect, useState} from 'react';
import DialogTemplate from './DialogTemplate.tsx';
import LoadingLayout from './LoadingLayout.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import UserImage from '../UserImage.tsx';
import {InitRefuseContents} from '../../constant/initData.ts';
import {IRefuseContents} from '../../constant/interfaces.ts';
import authControl from '../../constant/authControl.ts';
import dataGen from '../../constant/dateGen.ts';
import Api from '../../constant/Api.ts';

import '../../styles/dialogs/ApplyDialog.scss';

interface IApplyDialog {
  refuseId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyDenyContentsDialog({refuseId, isOpen, setIsOpen}: IApplyDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refuseContents, setRefuseContents] = useState<IRefuseContents>(InitRefuseContents);

  const myID = authControl.getUserIdFromToken();

  useEffect(() => {
    if (myID <= 0 || refuseId <= 0) return;

    setIsLoading(true);
    Api.fetch2Json(`api/v1/team/refuse/${refuseId}`)
      .then(data => setRefuseContents(data))
      .catch(e => console.error('거절 이유 지원서를 볼 수 없습니다', e))
      .finally(() => setIsLoading(false));
  }, [refuseId]);

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='apply_dialog apply_deny_contents_dialog' style={{minWidth: 380}}>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>프로젝트</span>
              <h3>{refuseContents.teamName}</h3>
            </div>
            <div>
              <button className='image_button'
                      onClick={() => setIsOpen(false)}>
                <CloseIcon width={28} height={28}/>
              </button>
            </div>
          </div>

          <div className='dialog_content'>
            <div className='user_info_layout'>
              <UserImage profileImageURL={refuseContents.leaderImage} />
              <h4>{refuseContents.leaderName}</h4>
            </div>

            <p><b>시간:</b> {dataGen.getRelativeDate(refuseContents.refuseDate)}</p>
            <p><b>to</b> {refuseContents.refusedUser}</p>

            <h4>거절 이유</h4>
            <p className='contents_box'>
              {refuseContents.refuseReason}
            </p>
          </div>

          <div className='dialog_footer fill'>
            <button className='cancel'
                    onClick={() => setIsOpen(false)}>
              확인
            </button>
          </div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default ApplyDenyContentsDialog;