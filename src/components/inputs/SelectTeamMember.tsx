import TechStackSelector from './TechStackSelector.tsx';
import {IRecruitmentInfo} from '../../constant/interfaces.ts';

const RecuritFieldArr = ['선택', '기획', 'UI/UX', '프론트엔드', '백엔드', '앱', '게임', 'AI', '기타'];

interface ISelectTeamMember {
  index: number;
  teamMembers: IRecruitmentInfo[];
  setTeamMembers: (func: (prev: IRecruitmentInfo[]) => IRecruitmentInfo[]) => void;
}

export function isEmptyTeamMember(teamMember: IRecruitmentInfo): boolean {
  return teamMember.role === '선택' && teamMember.stacks.length === 0;
}

function SelectTeamMember({index, teamMembers, setTeamMembers}: ISelectTeamMember) {

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
      <select defaultValue={RecuritFieldArr[0]}
              value={teamMembers[index].role}
              onChange={e => setThisTeamMember(_ => ({
                role: e.target.value
              }))}>
        {RecuritFieldArr.map((option, index) => (
          <option key={index}
                  value={option}>
            {option}
          </option>
        ))}
      </select>

      <TechStackSelector selectedStacks={teamMembers[index].stacks}
                         setSelectedStacks={prev => setThisTeamMember(member => ({stacks: prev(member.stacks)}))}/>
      <button className='circle'
              onClick={() => setThisTeamMember(prev => ({
                maxCount: Math.max(teamMembers[index].count, prev.maxCount - 1)
              }))}>-</button>
      <span>{teamMembers[index].maxCount}명</span>
      <button className='circle'
              onClick={() => setThisTeamMember(prev => ({
                maxCount: prev.maxCount + 1
              }))}>+</button>
      <button className='stack'
              disabled={teamMembers[index].count != 0}
              onClick={() =>
        setTeamMembers(prev =>
          prev.filter((_, idx) => idx !== index)
        )}>삭제하기</button>
      {/*<button className='stack'>추가하기</button>*/}
    </li>
  );
}

export default SelectTeamMember;