import React, {useEffect, useRef, useState} from 'react';
import StackImage from '@components/StackImage.tsx';
import CloseIcon from '@components/svgs/CloseIcon.tsx';
import TechStacks, {saveSelectedTechStack, searchTechStacks} from '@constant/stackList.ts';
import {ITechStack} from '@constant/interfaces.ts';
import '@styles/components/TechStackSelector.scss';
import Alert from '@constant/Alert.ts';

interface ITechStackSelector {
  value: string[];
  placeholder?: string;
  max?: number;
  allowCustomInput?: boolean;
  onChange?: (value: string[]) => void;
}

// Todo: 스택 선택자 컴포넌트 수정 - 리펙터링, 스타일링 다시하기
// Fixme: dom + 이미지가 많아지면서 버벅이는 이슈 나옴
// Todo: input 컴포넌트에 검색까지 같이 하도록 변경
// Todo: MentorStackSelect, MentoringTechStackList 컴포넌트와 합치기
function TechStackSelector({value, placeholder='스택 입력', max=Infinity, allowCustomInput=false, onChange}: ITechStackSelector) {
  const popupRef = useRef<HTMLDivElement>(null);
  const inputLayoutRef = useRef<HTMLDivElement>(null);
  const searchCloneRef = useRef<HTMLSpanElement>(null);

  const [searchWidth, setSearchWidth] = useState<number>(0);
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

  // 검색창 크기 조절
  useEffect(() => {
    if (searchCloneRef.current) {
      setSearchWidth(
        Math.max(searchCloneRef.current.getBoundingClientRect().width, 80)
      );
    }
  }, [search]);

  // 외부 클릭 이벤트
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

  // 검색 스택 업데이트
  useEffect(() => {
    setSearchedStacks(
      searchTechStacks(search)
        .filter(stack => !value.includes(stack.tagName))
    );
  }, [search, value]);

  function addStack(stack: string) {
    if (search.length >= max) {
      Alert.show(`최대 ${max}개까지 선택 가능합니다.`);
      return;
    }

    if (value.includes(stack)) {
      Alert.show('이미 선택된 스택입니다.');
      return;
    }

    if (!allowCustomInput && !TechStacks.some(s => s.tagName === stack)) {
      Alert.show('존재하지 않는 스택입니다.');
      return;
    }

    if (!onChange) return;
    onChange([...value, stack]);
    saveSelectedTechStack(stack);
  }

  function deleteStack(stack: string) {
    if (!onChange) return;
    onChange(value.filter(s => s !== stack));
  }

  return (
    <div className='tech_stack_selector'
         onKeyDown={selectKeyEvent}
         ref={popupRef}>
      <div className='inputs_layout'
           tabIndex={0}
           ref={inputLayoutRef}
           onClick={() => setIsShow(true)}>
        {value.length > 0 && (
          <ul className='searched_layout'>
            {value.map(stack => (
              <li className='selection_view' key={stack}>
                <span>#{stack}</span>
                <button className='image_button' onClick={() => deleteStack(stack)}>
                  <CloseIcon width={20} height={20}/>
                </button>
              </li>
            ))}
          </ul>
        )}

        <input type='text'
                style={{width: searchWidth}}
               value={search}
               placeholder={value.length ? '' : placeholder}
               onChange={e => setSearch(e.target.value)}/>

        <span ref={searchCloneRef} aria-disabled>{search}</span>
      </div>

      {isShow && (
        <div className='search_layout' tabIndex={0}>
          <input type='text'
                 placeholder='스택 선택 또는 검색'
                 maxLength={49}
                 onKeyDown={searchKeyEvent}
                 value={search}
                 onChange={e => setSearch(e.target.value)}/>
          {!search && (
            <p className='small_tips'>최근 선택된 스택</p>
          )}
          <ul>
            {searchedStacks.length > 0 ? searchedStacks.map(stack => (
              <li className='option_view' key={stack.tagID}
                  onClick={() => addStack(stack.tagName)}>
                <StackImage stack={stack} hasTooltip={false}/>
                <span>{stack.tagName}</span>
              </li>
            )) : (
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