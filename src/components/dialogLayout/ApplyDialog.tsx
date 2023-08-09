import React, {useEffect, useState} from "react";
import DialogTemplate from "../DialogTemplate.tsx";
import LoadingLayout from "../LoadingLayout.tsx";
import CloseIcon from "../svgs/CloseIcon.tsx";
import TierSvg from "../svgs/Tier/TierSvg.tsx";

import '../../styles/dialogs/ApplyDialog.scss';
import FieldSelector from "../inputs/FieldSelector.tsx";
import {ProjectEdit} from "../../dummies/dummyData.ts";
import {IProjectRecruitment} from "../../constant/interfaces.ts";

interface IApplyDialog {
  projectId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ApplyDialog({projectId, isOpen, setIsOpen}: IApplyDialog) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedField, setSelectedField] = useState<number>(-1);

  const [recruitMemberInfo, setRecruitMemberInfo] = useState<IProjectRecruitment>(ProjectEdit.recruitMemberInfo);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`/api/v1/team/${projectId}/recruitInfo`)
        .then(res => res.json())
        .then(data => setRecruitMemberInfo(data))
        .catch(() => setRecruitMemberInfo(ProjectEdit.recruitMemberInfo));

      setIsLoading(false);
    }, 500);
  }, [projectId]);

  return (
    <DialogTemplate isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <LoadingLayout isLoading={isLoading}>
        <div className='apply_dialog'>
          <div className='dialog_header'>
            <div>
              <span className='type_box'>프로젝트</span>
              <h3>맛집탐방 어플</h3>
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
              <img src='https://avatars.githubusercontent.com/u/48755175?v=4' alt='user image'/>
              <TierSvg width={15} height={20} tier={3}/>
              <h4>김민수</h4>
            </div>
            <p>
              안녕하세요! 맛집 탐방 어플을 만드려고 하는 곰도리 푸우입니다. <br/>
              현재 기술 스택과 원하시는 방향성 또는 기획을 같이 첨부해주시면 <br/>
              연락을 다시 드리겠습니다! 감사합니다.
            </p>

            <h4>지원 분야</h4>
            <ul>
              {recruitMemberInfo.memberList.map((field, index) => (
                <FieldSelector key={index}
                               {...field}
                               selected={index == selectedField}
                               onClick={() => {
                                 if (field.count == field.maxCount)
                                   return;
                                 if (index == selectedField)
                                   setSelectedField(-1);
                                 else
                                    setSelectedField(index);
                               }}/>
              ))}
            </ul>

            <h4>자기 소개</h4>
            <textarea placeholder='내용을 작성해 주세요' className='contents_box'/>
          </div>

          <div className='dialog_footer fill'>
            <button onClick={() => setIsOpen(false)}>
              지원하기
            </button>
            <button className='cancel'
                    onClick={() => setIsOpen(false)}>
              취소하기
            </button>
          </div>
        </div>
      </LoadingLayout>
    </DialogTemplate>
  );
}

export default ApplyDialog;