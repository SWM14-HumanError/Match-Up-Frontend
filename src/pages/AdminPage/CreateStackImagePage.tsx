import {useEffect, useState} from 'react';
import AdminNavigation from '@components/navigation/AdminNavigation.tsx';
import {IDeviconJson} from "@constant/interfaces.ts";
import StackList from '@constant/stackList.ts';
import '@styles/pages/CreateStackImagePage.scss';

interface IKoNamesJson {
  tagName: string;
  koNames: string[];
}

function CreateStackImagePage() {
  const [notExistStacks, setNotExistStacks] = useState<string[]>([]);
  const [stackInfoList, setStackInfoList] = useState<string>('');
  const [stackList, setStackList] = useState<string>('');
  const [stackKoreanList, setStackKoreanList] = useState<string>('');
  const [stackKoAddedList, setStackKoAddedList] = useState<string>('');

  // stackInfoList를 변환하여 stackList로 변환합니다.
  useEffect(() => {
    try {
      const json: IDeviconJson[] = JSON.parse(stackInfoList);

      const stackList = json.map((stack, index) => {
        return {
          tagID: index,
          tagName: stack.name,
          altnames: stack.altnames,
          color: stack.color,
          svg: stack.versions.svg[0],
        }
      });

      setStackList(JSON.stringify(stackList, null, 2)
        .replace(/"tagID"/g, 'tagID')
        .replace(/"tagName"/g, 'tagName')
        .replace(/"altnames"/g, 'altnames')
        .replace(/"color"/g, 'color')
        .replace(/"svg"/g, 'svg')
        .replace(/"/g, `'`));
    }
    catch (e) {setStackList('JSON 형식이 아닙니다. devicon.json 파일을 붙여넣어주세요.');}
  }, [stackInfoList]);

  // stackList를 변환하여 stackKoreanList로 변환합니다.
  useEffect(() => {
    try {
      const json: IKoNamesJson[] = JSON.parse(stackKoreanList);
      console.log(stackKoreanList);

      const stacks = [...StackList.map((stack) => ({...stack, koNames: []}))];
      json.forEach((stack) => {
        const index = stacks.findIndex((item) => item.tagName === stack.tagName);

        if (index !== -1) {
          // @ts-ignore
          stacks[index].koNames = stack.koNames;
        }
      });

      setStackKoAddedList(JSON.stringify(stacks, null, 2)
        .replace(/"tagID"/g, 'tagID')
        .replace(/"tagName"/g, 'tagName')
        .replace(/"altnames"/g, 'altnames')
        .replace(/"color"/g, 'color')
        .replace(/"svg"/g, 'svg')
        .replace(/"koNames"/g, 'koNames')
        .replace(/"/g, `'`));
    }
    catch (e) {
      console.error(e);
      setStackKoAddedList('JSON 형식이 아닙니다. devicon.json 파일을 붙여넣어주세요.');
    }
  }, [stackKoreanList]);

  function copyAll(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('복사되었습니다.');
    });
  }

  return (
    <>
      <AdminNavigation/>

      <div className='main_layout'>
        <h1>스택 목록</h1>

        <h2>찾을 수 없는 스택 이미지</h2>
        <ul className='tech_layout'>
          {notExistStacks.length ?
            notExistStacks.map((stack, index) => (
              <li key={index}>{stack}</li>
            )) : (
              <li>없음</li>
            )}
        </ul>

        <div className='header_flex'>
          <h2>스택 이미지 목록</h2>
          <p>{StackList.length}개의 스택 이미지 목록</p>
        </div>
        <ul className='tech_layout'>
          {StackList.map((stack, index) => (
            <li key={index}>
              <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${stack.tagName}/${stack.tagName}-${stack.svg}.svg`} alt={stack.tagName}
                   onError={() => setNotExistStacks(prev => [...prev, stack.tagName])}/>
            </li>
          ))}
        </ul>

        <h2>스택 리스트 생성기</h2>
        <p>
          <a href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.json' target='_blank'>devicon.json</a>
          파일을 붙여넣어서 스택 리스트를 생성합니다.
        </p>
        <textarea name='' id=''
                  cols={50} rows={10}
                  value={stackInfoList}
                  onChange={e => setStackInfoList(e.target.value)}/>

        <div className='header_flex'>
          <h3 style={{display:'inline'}}>변환된 스택 리스트</h3>
          <button className='stack' onClick={() => copyAll(stackList)}>전체 복사</button>
        </div>
        <textarea name='' id=''
                  cols={50} rows={10}
                  value={stackList} readOnly/>

        <div className='header_flex'>
          <h3>스택 제목만 있는 객체</h3>
          <button className='stack' onClick={() => copyAll(
            JSON.stringify(StackList.map((stack) => ({'tagName': stack.tagName})))
          )}>전체 복사</button>
        </div>
        <textarea name='' id='' value={JSON.stringify(StackList.map((stack) => ({'tagName': stack.tagName})))} readOnly/>

        <div className='header_flex'>
          <h3>Korean 저장해봅시다</h3>
        </div>
        <textarea name='' id=''
                  cols={50} rows={10}
                  value={stackKoreanList}
                  onChange={e => setStackKoreanList(e.target.value)}/>

        <div className='header_flex'>
          <h3 style={{display: 'inline'}}>변환된 스택 리스트</h3>
          <button className='stack' onClick={() => copyAll(stackKoAddedList)}>전체 복사</button>
        </div>

        <textarea name='' id='' value={stackKoAddedList} readOnly/>


      </div>
    </>
  );
}

export default CreateStackImagePage;