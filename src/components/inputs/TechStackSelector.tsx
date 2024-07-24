import React, {useEffect, useRef, useState} from 'react';
import StackImage from '../StackImage.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import TechStacks from '../../constant/stackList.ts';
import dataGen from '../../constant/dateGen.tsx';
import {ITechStack} from '../../constant/interfaces.ts';
import '../../styles/components/TechStackSelector.scss';

interface IOptionView {
  stack: ITechStack;
  setSelectedStacks: (func: (prev: ITechStack[]) => ITechStack[]) => void;
}

interface ITechStackSelector {
  selectedStacks: string[];
  setSelectedStacks: (func: (prev: ITechStack[]) => ITechStack[]) => void;
}

function SelectionView({stack, setSelectedStacks}: IOptionView) {
  return (
    <li className='selection_view'>
      <span>#{stack.tagName}</span>
      <button className='image_button'
              onClick={() => setSelectedStacks( stacks =>
                  stacks.filter(selectedStack => selectedStack.tagID !== stack.tagID)
              )}>
        <CloseIcon width={20} height={20}/>
      </button>
    </li>
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

// Todo: 스택 선택자 컴포넌트 수정 - 리펙터링, 스타일링 다시하기
function TechStackSelector({selectedStacks, setSelectedStacks}: ITechStackSelector) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputLayoutRef = useRef<HTMLDivElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchedStacks, setSearchedStacks] = useState<ITechStack[]>([]);

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

  useEffect(() => {
    setSearchedStacks(TechStacks.filter(stack =>
      stack.tagName.includes(search.toLowerCase()) && !selectedStacks.includes(stack.tagName)));
  }, [search, selectedStacks]);

  return (
    <div className='tech_stack_selector'
         onKeyDown={selectKeyEvent}
         ref={popupRef}>
      <div className='inputs_layout'
           tabIndex={0}
           ref={inputLayoutRef}
           onClick={() => setIsShow(true)}>
        {selectedStacks.length > 0 ? (
            <ul className='searched_layout'>
              {selectedStacks.map(stack => (
                <SelectionView key={stack} stack={dataGen.getTechStack(stack)} setSelectedStacks={setSelectedStacks}/>
              ))}
            </ul>
          ) : (
          <span>스택을 입력해주세요</span>
        )}
      </div>

      {isShow && (
        <div className='search_layout' tabIndex={0}>
          <input type='text'
                 placeholder='스택 선택 또는 검색'
                 maxLength={49}
                 onKeyDown={searchKeyEvent}
                 value={search}
                 onChange={e => setSearch(e.target.value)}/>
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
  );
}

export default TechStackSelector;