import {useEffect, useRef, useState} from 'react';
import StackImage from '../StackImage.tsx';
import Search from '../svgs/Search.tsx';
import DateGen from '../../constant/dateGen.tsx';
import TechStacks from '../../constant/stackList.ts';
import {ITechStack} from '../../constant/interfaces.ts';
import '../../styles/components/MentoringTechStackList.scss';
import '../../styles/components/TechStackSelector.scss';

interface IOptionView {
  stack: ITechStack;
  setSelectedStacks: (func: (prev: ITechStack[]) => ITechStack[]) => void;
}
interface ITechStackSelector {
  selectedStacks?: string[];
  setSelectedStacks?: (func: (prev: ITechStack[]) => ITechStack[]) => void;
}

// Todo: 멘토링 기술스택 설정 하는 것 구현 API 연결
function MentoringTechStackList({selectedStacks=[], setSelectedStacks=() => {}}: ITechStackSelector) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchedStacks, setSearchedStacks] = useState<ITechStack[]>([]);

  const handleOutsideClick = (event: { target: any; }) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (isShow) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isShow]);

  useEffect(() => {
    setSearchedStacks(TechStacks.filter(stack =>
      stack.tagName.includes(search) && !selectedStacks.includes(stack.tagName)));
  }, [search]);

  return (
    <div className='mentoring_techstack_list tech_stack_selector'>
      <div ref={popupRef}>
        <div className='tech_search_layout'>
          <input type='text'
                 className='mentoring_techstack_input'
                 placeholder='검색'
                 onFocus={() => setIsShow(true)}
                 onChange={e => setSearch(e.target.value)}/>
          <Search width={36} height={36} color='#999999'/>

          <span>최대 5개까지 선택 가능</span>
        </div>

        {isShow && (
          <div className='search_layout'>
            <ul>
              {searchedStacks.length > 0 ? (
                searchedStacks.map(stack => (
                  <OptionView key={stack.tagID} stack={stack} setSelectedStacks={setSelectedStacks}/>
                ))):(
                <li className='option_view not_searched'>
                  <span>검색 결과가 없습니다</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        <ul>
          {selectedStacks.map(stack => (
            <li><StackImage stack={DateGen.getTechStack(stack)}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OptionView({stack, setSelectedStacks}: IOptionView) {
  return (
    <li className='option_view' onClick={() => setSelectedStacks(stacks => [...stacks, stack])}>
      <StackImage stack={stack} hasTooltip={false}/>
      <span>{stack.tagName}</span>
    </li>
  );
}

export default MentoringTechStackList;