import React, {useEffect, useState} from 'react';
import SelectTeamMember from '../../components/inputs/SelectTeamMember.tsx';
import {IEditProjectInfo, IRecruitmentInfo} from '../../constant/interfaces.ts';
import {TechListEng, TechListKor} from './SelectStackLevel.tsx';

interface ISelectTeamMemberList {
  value: IRecruitmentInfo[];
  onChange: React.Dispatch<React.SetStateAction<IEditProjectInfo>>;
  teamMemberRef: React.RefObject<HTMLSelectElement>;
}

const InitMemberItem: IRecruitmentInfo = {
  role: TechListEng[0],
  stacks: [],
  maxCount: 1,
  count: 0
};

function SelectTeamMemberList({ value, onChange, teamMemberRef }: ISelectTeamMemberList) {
  const [memberList, setMemberList] = useState<IRecruitmentInfo[]>(value);

  // 선택 및 삭제 시 memberList 업데이트
  useEffect(() => {
    const prevMemberList = memberList;
    const updatedMemberList = getNormalizedMemberList(value);

    if (prevMemberList.length !== updatedMemberList.length || !memberList.length) {
      setMemberList(updatedMemberList);
    }
  }, [value]);

  // 업데이트 시 onChange
  useEffect(() => {
    onChange(prev => ({
      ...prev,
      recruitMemberInfo: {
        ...prev.recruitMemberInfo,
        memberList: [
          ...memberList.filter(member => member.role !== TechListKor[0])
        ],
      },
    }));
  }, [memberList]);

  return (
    <ul className='member_selector_layout'>
      {memberList.map((_, index) => (
        <SelectTeamMember key={index}
                          index={index}
                          lastSelectRef={teamMemberRef}
                          teamMembers={memberList}
                          setTeamMembers={prevMembers => setMemberList(
                            prev => prevMembers(prev)
                          )} />
      ))}
    </ul>
  );
}

function getNormalizedMemberList(memberList: IRecruitmentInfo[]): IRecruitmentInfo[] {
  return [
    ...memberList.filter(member => member.role !== TechListEng[0]),
    {...InitMemberItem}
  ]
}

export default SelectTeamMemberList;