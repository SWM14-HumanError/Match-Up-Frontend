import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import StackImage from '@components/StackImage.tsx';
import CloseIcon from '@components/svgs/CloseIcon.tsx';
import Search from '@components/svgs/Search.tsx';
import {searchTechStacks, saveSelectedTechStack, getTechStack, isMatchedStack} from '@constant/SearchTeckStacks.ts';
import TechStacks from '@constant/stackList.ts';
import Alert from '@constant/Alert.ts';
import '@styles/components/TechStackSelector.scss';
import {DefaultStack} from '@constant/initData.ts';
import {ITechStack} from '@constant/interfaces.ts';

interface ITechStackSelector {
  value: string[];
  placeholder?: string;
  max?: number;
  allowCustomInput?: boolean;
  hideSelectedOptions?: boolean;
  onChange?: (value: string[]) => void;
}

// Todo: 기능이 많아지면서 컴포넌트 리펙터링 필요
// Fixme: dom + 이미지가 많아지면서 버벅이는 이슈 나옴 / + isOpen 처리하는데 오랜시간 걸림 (localstorage load 때문)
function TechStackSelector({value, placeholder='스택 입력', max=Infinity, allowCustomInput=false, hideSelectedOptions=false, onChange}: ITechStackSelector) {
  const popupRef = useRef<HTMLDivElement>(null);
  const searchCloneRef = useRef<HTMLSpanElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Fixme: search 변경 시 이미지 계속 요청하는 버그 수정
  const searchedStacks = useMemo(() => {
    const searched =  searchTechStacks(search).filter(stack => !value.includes(stack.tagName))

    // 사용자 정의 입력 허용 시, 검색 결과가 없거나 검색어와 일치하지 않는 스택이 있을 때 추가
    if (allowCustomInput && (searched.length === 0 || !searched.some(stack => isMatchedStack(search, stack)))) {
      searched.unshift({...DefaultStack, tagName: search});
    }

    return searched;
  }, [search, value]);

  const searchWidth = useMemo(() => {
    if (searchCloneRef.current)
        return Math.max(searchCloneRef.current.getBoundingClientRect().width, 80);
    return 80;
  }, [search]);

  const addStack = useCallback((stack: string) => {
    if (max !== 1 && value.length >= max) {
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

    // max = 1 일 때, 스택만 변경되도록 설정
    if (max === 1) {
      onChange?.([stack]);
      saveSelectedTechStack(stack);
      setSearch(hideSelectedOptions ? '' : stack);
      console.log('search', search, stack);
      return;
    }

    onChange?.([...value, stack]);
    saveSelectedTechStack(stack);
    setSearch('');
    searchRef.current?.focus();
  }, [max, value, allowCustomInput, onChange, hideSelectedOptions, search]);

  function cancelSearch() {
    setIsShow(false);
    searchRef.current?.focus();
    popupRef.current?.blur();
  }

  const deleteStack = useCallback((stack: string) => {
    onChange?.(value.filter(s => s !== stack));
  }, [value, onChange]);

  function deleteAllStacks() {
    onChange?.([]);
    setSearch('');
    setIsShow(true);
    searchRef.current?.focus();
  }

  // 검색창 키 이벤트
  function searchKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Tab') {
      setIsShow(false);
      popupRef.current?.blur();
    }
    else if (e.key === 'Enter') {
      e.preventDefault();

      if (!isShow) {
        setIsShow(true);
      }
      else if (focusedIndex >= 0) {
        addStack(searchedStacks[focusedIndex].tagName);
      }
      else if (allowCustomInput)
        addStack(search);
      else if (searchedStacks.length > 0)
        addStack(searchedStacks[0].tagName);

      setFocusedIndex(-1);
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isShow) {
        setIsShow(true);
        setFocusedIndex(-1);
        return;
      }

      setFocusedIndex(Math.min(searchedStacks.length - 1, focusedIndex + 1));
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(Math.max(-1, focusedIndex - 1));
    }
    else if (e.key === 'Escape') {
      cancelSearch();
    }
    else if (e.key === 'Backspace' && search.length === 0) {
      if (!hideSelectedOptions && value.length > 0) {
        deleteStack(value[value.length - 1]);
      }
    }
    else {
      if (!isShow) {
        setIsShow(true);
      }
      setFocusedIndex(-1);
    }
  }

  // 외부 클릭 이벤트
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        cancelSearch();
      }
    };

    if (isShow) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick); // 삭제
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isShow]);

  // 포커스 이동
  useEffect(() => {
    if (isShow) {
      const li = ulRef.current?.children[focusedIndex] as HTMLElement;

      li?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      })
    }
  }, [focusedIndex, isShow]);

  // max = 1 이고, 유효한 search 가 아닐 때 초기화
  useEffect(() => {
    if (!isShow && max === 1 && !hideSelectedOptions && !allowCustomInput) {
      setSearch(value.length ? value[0] : '');
    }
  }, [isShow, value]);

  return (
    <div className={hideSelectedOptions ? 'tech_stack_selector search_style' : 'tech_stack_selector'}
         ref={popupRef}>
      <div className={max === 1 ? 'inputs_layout width_auto' : 'inputs_layout'}
           onClick={() => {
             setIsShow(true);
              searchRef.current?.focus();
           }}>
        {!hideSelectedOptions && !!value.length && (
          max === 1 ? (
            <StackImage key={value[0]} stack={getTechStack(value[0])} hasTooltip={false}/>
          ) : (
            <ul className='searched_layout'>
              {value.map(stack => (
                <li className='selection_view' key={stack}>
                  <span>#{stack}</span>
                  <button className='image_button'
                          aria-label={`${stack} 스택 삭제`}
                          onClick={() => deleteStack(stack)}>
                    <CloseIcon width={14} height={14}/>
                  </button>
                </li>
              ))}
            </ul>
          )
        )}

        <input type='text'
               style={{width: searchWidth}}
               value={search}
               maxLength={49}
               ref={searchRef}
               placeholder={!hideSelectedOptions && value.length ? '' : placeholder}
               onKeyDown={searchKeyEvent}
               onChange={e => setSearch(e.target.value)}/>

        {max === 1 && !hideSelectedOptions && (value.length || search) && (
          <button className='image_button control_button'
                  aria-label='스택 및 검색어 초기화'
                  onClick={deleteAllStacks}>
            <CloseIcon width={14} height={14}/>
          </button>
        )}

        {hideSelectedOptions && (
          <Search width={36} height={36} color='#999999'/>
        )}

        <span ref={searchCloneRef} aria-disabled>{search}</span>
      </div>

      {isShow && (
        <div className='search_layout' tabIndex={0}>
          {!search && (
            <p className='small_tips'>최근 선택된 스택</p>
          )}
          <ul ref={ulRef} onMouseLeave={() => setFocusedIndex(-1)}>
            {searchedStacks.length > 0 ? searchedStacks.map((stack, index) => (
              <SearchedStackLi key={stack.tagName}
                               index={index}
                               stack={stack}
                               selected={focusedIndex === index}
                               addStack={addStack}
                               setFocusedIndex={setFocusedIndex}/>
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

interface ISearchedStackLi {
  stack: ITechStack;
  selected: boolean;
  index: number;
  setFocusedIndex: (index: number) => void;
  addStack: (stack: string) => void;
}

function SearchedStackLi({ stack, selected, index, setFocusedIndex, addStack }: ISearchedStackLi) {
  return (
    <li className={'option_view ' + (selected ? 'selected' : '')}
        tabIndex={0}
        onMouseOver={() => setFocusedIndex(index)}
        onClick={() => addStack(stack.tagName)}>
      <StackImage stack={stack} hasTooltip={false}/>
      <span>{stack.tagName}</span>
    </li>
  );
}

export default TechStackSelector;