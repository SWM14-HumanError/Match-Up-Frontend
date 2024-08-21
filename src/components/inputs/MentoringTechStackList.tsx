import StackImage from '../StackImage.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TechStackSelector from '@components/inputs/TechStackSelector.tsx';
import dataGen from '@constant/dateGen.tsx';
import '@styles/components/MentoringTechStackList.scss';

interface ITechStackSelector {
  stacks?: string[];
  onChange?: (stacks: string[]) => void;
}

function MentoringTechStackList({stacks, onChange}: ITechStackSelector) {
  function deleteSelectedStack(index: number) {
    onChange?.(stacks?.filter((_, i) => i !== index) ?? []);
  }

  return (
    <div className='mentoring_techstack_list'>
      <div className='tech_search_layout'>
        <TechStackSelector value={stacks ?? []}
                           max={5}
                           placeholder={'검색'}
                           onChange={onChange}
                           allowCustomInput
                           hideSelectedOptions/>

        <span>최대 5개까지 선택 가능</span>
      </div>

      <div>
        <ul className='mentoring_selected_tech_list'>
          {stacks && stacks.map((stack, index) => (
            <li key={stack}>
              <button className='circle'
                      aria-label={`${stack} 스택 삭제`}
                      onClick={() => deleteSelectedStack(index)}>
                <CloseIcon/>
              </button>
              <StackImage stack={dataGen.getTechStack(stack)}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MentoringTechStackList;