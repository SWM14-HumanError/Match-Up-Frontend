import React from 'react';
import TechStackSelector from './TechStackSelector.tsx';
import {IRecruitmentInfo} from '@constant/interfaces.ts';
import {getTechListEng, getTechListKor, TechListEng, TechListKor} from './SelectStackLevel.tsx';

interface ISelectTeamMember {
  index: number;
  lastSelectRef: React.RefObject<HTMLSelectElement>;
  teamMembers: IRecruitmentInfo[];
  setTeamMembers: (func: (prev: IRecruitmentInfo[]) => IRecruitmentInfo[]) => void;
}

function SelectTeamMember({index, lastSelectRef, teamMembers, setTeamMembers}: ISelectTeamMember) {
  const ChangeDisabled = teamMembers[index].count != 0;

  function setThisTeamMember(newObj: (prev :IRecruitmentInfo) => Partial<IRecruitmentInfo>) {
    setTeamMembers(prev => {
      const newTeamMembers = [...prev];
      newTeamMembers[index] = {
        ...newTeamMembers[index],
        ...(newObj(newTeamMembers[index]))
      };
      return newTeamMembers;
    });
  }

  // Todo: value, defaultValue 둘중 하나만 쓰기 : 오류 생김
  return (
    <li className='inputs_layout'>
      <select defaultValue={TechListKor[0]}
              value={getTechListKor(teamMembers[index].role)}
              ref={index === teamMembers.length - 1 ? lastSelectRef : null}
              onChange={e => setThisTeamMember(() => ({
                role: getTechListEng(e.target.value),
              }))}
              disabled={ChangeDisabled}>

        { getAvailableRecruitFields(teamMembers, index).map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <TechStackSelector value={teamMembers[index].stacks}
                         allowCustomInput={true}
                         onChange={
                            stacks => setThisTeamMember(
                              prev => ({...prev, stacks}))
                         }/>

      <button className='circle'
              onClick={() => setThisTeamMember(prev => ({
                maxCount: Math.max(Math.max(1, teamMembers[index].count), prev.maxCount - 1)
              }))}>-</button>

      <span>{teamMembers[index].maxCount}명</span>

      <button className='circle'
              onClick={() => setThisTeamMember(prev => ({
                maxCount: Math.min(10, prev.maxCount + 1)
              }))}>+</button>

      { !isEmptyTeamMember(teamMembers[index]) && !ChangeDisabled &&
        <button className='stack'
                disabled={ChangeDisabled}
                onClick={() =>
                  setTeamMembers(prev =>
                    prev.filter((_, idx) => idx !== index)
                )}>
          삭제하기
        </button>
      }
    </li>
  );
}

export function isEmptyTeamMember(teamMember: IRecruitmentInfo): boolean {
  return teamMember.role === TechListEng[0] && teamMember.stacks.length === 0;
}

function getAvailableRecruitFields(teamMembers: IRecruitmentInfo[], index: number): string[] {
  return TechListKor.filter(field => field === TechListKor[0] || field === getTechListKor(teamMembers[index].role) ||
    teamMembers.find(member => getTechListKor(member.role) === field) === undefined);
}

export default SelectTeamMember;