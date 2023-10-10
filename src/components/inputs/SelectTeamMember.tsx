import TechStackSelector from './TechStackSelector.tsx';
import {IRecruitmentInfo} from '../../constant/interfaces.ts';
import dataGen from '../../constant/dateGen.ts';

const RecruitFieldArr = ['선택', '기획', 'UI/UX', '프론트엔드', '백엔드', '앱', '게임', 'AI', '기타'];

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

  return (
    <li className='inputs_layout'>
      <select defaultValue={RecruitFieldArr[0]}
              value={teamMembers[index].role}
              ref={index === teamMembers.length - 1 ? lastSelectRef : null}
              onChange={e => setThisTeamMember(_ => ({role: e.target.value}))}
              disabled={ChangeDisabled}>

        { getAvailableRecruitFields(teamMembers, index).map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <TechStackSelector selectedStacks={teamMembers[index].stacks}
                         setSelectedStacks={prev => setThisTeamMember(member => ({stacks: prev(member.stacks.map(
                            stack => dataGen.getTechStack(stack)
                           )).map(stack => stack.tagName)
                         }))}/>

      <button className='circle'
              onClick={() => setThisTeamMember(prev => ({
                maxCount: Math.max(Math.max(1, teamMembers[index].count), prev.maxCount - 1)
              }))}>-</button>

      <span>{teamMembers[index].maxCount}명</span>

      <button className='circle'
              onClick={() => setThisTeamMember(prev => ({
                maxCount: Math.min(10, prev.maxCount + 1)
              }))}>+</button>

      <button className='stack'
              disabled={ChangeDisabled}
              onClick={() =>
        setTeamMembers(prev =>
          prev.filter((_, idx) => idx !== index)
        )}>삭제하기</button>
    </li>
  );
}

export function isEmptyTeamMember(teamMember: IRecruitmentInfo): boolean {
  return teamMember.role === '선택' && teamMember.stacks.length === 0;
}

function getAvailableRecruitFields(teamMembers: IRecruitmentInfo[], index: number): string[] {
  return RecruitFieldArr.filter(field => field === '선택' || field === teamMembers[index].role ||
    teamMembers.find(member => member.role === field) === undefined);
}

export default SelectTeamMember;