import React, {useEffect, useRef, useState} from 'react';
import StackImage from '../StackImage.tsx';
import RightArrow from '../svgs/RightArrow.tsx';
import CloseIcon from '../svgs/CloseIcon.tsx';
import {ITechStack} from '../../constant/interfaces.ts';
import TechStacks from '../../constant/stackList.ts';


interface ITechStackSelector {
  setStack: React.Dispatch<React.SetStateAction<string>>;
}

function MentorStackSelect({setStack}: ITechStackSelector) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectLayoutRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchedStacks, setSearchedStacks] = useState<(ITechStack)[]>([]);
  const [selectedStacksITech, setSelectedStacksITech] = useState<ITechStack | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (selectLayoutRef.current && !selectLayoutRef.current.contains(event.target)) {
        setIsShow(false);
        containerRef.current?.focus();
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
    setSearchedStacks(TechStacks.filter(stack => stack.tagName.includes(search.toLowerCase()) && stack !== selectedStacksITech));
  }, [search, selectedStacksITech]);

  function selectStack(stack: ITechStack | null) {
    if (stack === null) {
      setSelectedStacksITech(null);
      setStack('');
    } else {
      setSelectedStacksITech(stack);
      setStack(stack.tagName);
    }
  }

  function deleteStack(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    selectStack(null);
  }

  function selectKeyEvent(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsShow(true);
    }
    else if (e.key === 'Escape' || e.shiftKey && e.key === 'Tab') {
      setIsShow(false);
      selectLayoutRef.current?.focus();
    }
  }

  function searchKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Tab') {
      setIsShow(false);
      selectLayoutRef.current?.blur();
    }
  }

  return (
    <div className='tech_stack_selector'
         ref={containerRef}
         onClick={() => setIsShow(true)}
         onKeyDown={selectKeyEvent}
         tabIndex={0}>
      <div ref={selectLayoutRef}>
        <div className='select_layout'>
          <span className={selectedStacksITech ? 'selected' : ''}>
            {selectedStacksITech ? selectedStacksITech.tagName : '스택 전체'}

            {selectedStacksITech && (
              <button className='image_button' onClick={deleteStack}>
                <CloseIcon width={16} height={16}/>
              </button>
            )}
          </span>
          <RightArrow width={8} height={8} rotate={90}/>
        </div>

        {isShow && (
          <div className='search_layout'>
            <input type='text'
                   ref={searchRef}
                   placeholder='검색'
                   onKeyDown={searchKeyEvent}
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}/>
            <ul>
              {searchedStacks.length > 0 ? (
                searchedStacks.map(stack => (
                  <OptionView key={stack?.tagID}
                              stack={stack}
                              setSelectedStack={selectStack}/>
                ))) : (
                <li className='option_view not_searched'>
                  <span>검색 결과가 없습니다</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

interface IOptionView {
  stack: ITechStack | null;
  setSelectedStack: (stack: ITechStack | null) => void;
}

function OptionView({stack, setSelectedStack}: IOptionView) {
  return (
    <li className='option_view' onClick={() => setSelectedStack(stack)}>
      {stack === null ? (
        <span>없음</span>
      ) : (
        <>
          <StackImage stack={stack} hasTooltip={false}/>
          <span>{stack.tagName}</span>
        </>
      )}
    </li>
  );
}

export default MentorStackSelect;