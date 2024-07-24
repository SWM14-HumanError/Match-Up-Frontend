import React, {useEffect, useRef, useState} from 'react';
import StackImage from '../StackImage.tsx';
import Search from '../svgs/Search.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import DateGen from '../../constant/dateGen.tsx';
import TechStacks from '../../constant/stackList.ts';
import {ITechStack} from '../../constant/interfaces.ts';
import Alert from '../../constant/Alert.ts';
import '../../styles/components/MentoringTechStackList.scss';
import '../../styles/components/TechStackSelector.scss';

interface IOptionView {
  stack: ITechStack;
  setSelectedStacks: (func: (prev: ITechStack[]) => ITechStack[]) => void;
}

interface ITechStackSelector {
  stacks?: string[];
  onChange?: (stacks: string[]) => void;
}

// Todo: 팝업 나오는 부분 컴포넌트로 묶기
function MentoringTechStackList({stacks, onChange}: ITechStackSelector) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputLayoutRef = useRef<HTMLDivElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchedStacks, setSearchedStacks] = useState<ITechStack[]>([]);
  const [selectedStacksITech, setSelectedStacksITech] = useState<ITechStack[]>([]);

  function selectKeyEvent(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsShow(true);
    }
    else if (e.key === 'Escape' || e.shiftKey && e.key === 'Tab') {
      setIsShow(false);
      popupRef.current?.focus();
      inputLayoutRef.current?.focus();
    }
  }

  function searchKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Tab') {
      setIsShow(false);
      popupRef.current?.blur();
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsShow(false);
      }
    };

    if (isShow) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isShow]);

  // Searched stacks update
  useEffect(() => {
    setSearchedStacks(TechStacks.filter(stack =>
      stack.tagName.includes(search.toLowerCase()) && !selectedStacksITech.includes(stack)));
  }, [search, selectedStacksITech]);

  // input stacks update
  useEffect(() => {
    if (!stacks)
      return;
    if (!stacks.some((stack, i) => stack !== selectedStacksITech[i]?.tagName))
      return;

    setSelectedStacksITech(stacks.map(stack => DateGen.getTechStack(stack)));
  }, [stacks]);

  // Selected stacks update
  useEffect(() => {
    if (selectedStacksITech.length > 5) {
      setSelectedStacksITech(stacks => stacks.slice(0, 5));
      Alert.show('최대 5개까지 선택 가능합니다.');
      return;
    }
    
    if (onChange)
      onChange(selectedStacksITech.map(stack => stack.tagName));
  }, [selectedStacksITech]);

  function deleteSelectedStack(index: number) {
    setSelectedStacksITech(stacks => stacks.filter((_, i) => i !== index));
  }

  return (
    <div className='mentoring_techstack_list tech_stack_selector'
         onKeyDown={selectKeyEvent}>
      <div ref={popupRef}>
        <div className='tech_search_layout' ref={inputLayoutRef}>
          <input type='text'
                 className='mentoring_techstack_input'
                 placeholder='검색'
                 value={search}
                 onKeyDown={searchKeyEvent}
                 onFocus={() => setIsShow(!!search)}
                 onChange={e => {
                   setSearch(e.target.value);
                   setIsShow(!!e.target.value);
                 }}/>
          <Search width={36} height={36} color='#999999'/>

          <span>최대 5개까지 선택 가능</span>
        </div>

        {isShow && (
          <div className='search_layout'>
            <ul>
              {searchedStacks.length > 0 ? (
                searchedStacks.map(stack => (
                  <OptionView key={stack.tagID} stack={stack} setSelectedStacks={setSelectedStacksITech}/>
                ))) : (
                <li className='option_view not_searched'>
                  <span>검색 결과가 없습니다</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        <ul className='mentoring_selected_tech_list'>
          {selectedStacksITech.slice(0, 5).map((stack, index) => (
            <li key={stack.tagID}>
              <button className='circle'
                      onClick={() => deleteSelectedStack(index)}>
                <CloseIcon/>
              </button>
              <StackImage stack={stack}/>
            </li>
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