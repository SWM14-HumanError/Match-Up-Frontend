import {DefaultStack, InitSearchedStackNames} from '@constant/initData.ts';
import TechStacks from '@constant/stackList.ts';
import {ITechStack} from '@constant/interfaces.ts';
import stackList from '@constant/stackList.ts';
import {disassemble} from 'es-hangul';

const SEARCH_THRESHOLD = 2;
const SEARCHED_STACK_STORAGE_NAME = 'searched_stacks';


/** 스택 이름으로 스택을 가져옵니다. */
export function getTechStack(name: string) {
  const normalizedStack = name.toLowerCase().replace(/\./g, '');
  const techStack = stackList.filter(tech => tech.tagName === normalizedStack);

  if (techStack.length > 0)
    return techStack[0];
  return {...DefaultStack, tagName: name};
}


/** 중복되지 않는 스택을 가져옵니다. */
export function getUniqueTechStacks(techStacks: ITechStack[]|null) {
  if (!techStacks) return [];

  const unique: ITechStack[] = [];
  const sets = new Set<string>();

  techStacks.forEach(v => {
    if (!sets.has(v.tagName)) {
      unique.push(v);
      sets.add(v.tagName);
    }
  });

  return unique;
}


// Todo: 검색 로직에 분야에 대한 가중치 추가 - 추후 데이터 분석을 통해서 넣어야 함
// Todo: 검색 로직에 초성 검색 추가
/** 검색한 스택을 가져옵니다.
 *상단에는 유저에게 추천하는 스택을, 하단에는 그 외의 스택을 보여줍니다.
 * 처음에는 시작하는 글자, 다음은 포함하는 글자, 다음은 altname,koNames에서 시작하는 문자 */
export function searchTechStacks(search: string) {
  const stacksString = localStorage.getItem(SEARCHED_STACK_STORAGE_NAME);
  const stackNames = stacksString ? stacksString.split(',') : InitSearchedStackNames;

  const FavoriteStacks = stackNames.map(name =>
    TechStacks.find(stack => stack.tagName === name) ?? {...DefaultStack, tagName: name});

  if (!search) {
    if (!stacksString)
      localStorage.setItem(SEARCHED_STACK_STORAGE_NAME, stackNames.join(','));

    return FavoriteStacks;
  }


  // 검색어를 한국어 자모음으로 분해합니다.
  const disassembledSearch = disassemble(search.toLowerCase().replace(/\./g, ''));

  const ElseStacks = TechStacks.filter(stack => !stackNames.includes(stack.tagName));
  const AllStacks = [...FavoriteStacks, ...ElseStacks];

  // 검색어로 시작하는 스택을 찾습니다.
  const startWithStacks = AllStacks.filter(stack =>
      stack.tagName.startsWith(disassembledSearch) ||
      stack.koNames.some(name => disassemble(name).startsWith(disassembledSearch)));
  if (startWithStacks.length > SEARCH_THRESHOLD)
    return startWithStacks;

  // 검색어가 포함된 스택을 찾습니다.
  const includeWithStacks = AllStacks.filter(stack =>
      stack.tagName.includes(disassembledSearch) ||
      stack.koNames.some(name => disassemble(name).includes(disassembledSearch)));
  if (includeWithStacks.length > SEARCH_THRESHOLD)
    return includeWithStacks;

  // name 또는 altname가 검색어로 시작하는 스택을 찾습니다.
  const altStartWithStacks = AllStacks.filter(
    stack => [stack.tagName, ...stack.altnames].some(name =>
      name.startsWith(disassembledSearch)) ||
      stack.koNames.some(name => disassemble(name).startsWith(disassembledSearch)));
  if (altStartWithStacks.length > SEARCH_THRESHOLD)
    return altStartWithStacks;

  // name 또는 altname에 검색어가 포함된 스택을 찾습니다.
  return AllStacks.filter(
    stack => [stack.tagName, ...stack.altnames].some(name =>
      name.includes(disassembledSearch)) ||
      stack.koNames.some(name => disassemble(name).includes(disassembledSearch)));
}


/** 검색한 스택을 저장합니다.*/
export function saveSelectedTechStack(stackName: string) {
  const stacksString = localStorage.getItem(SEARCHED_STACK_STORAGE_NAME);
  const stackNames = stacksString ? stacksString.split(',') : InitSearchedStackNames;

  const SaveArr = [
    stackName,
    ...stackNames.filter(name => name !== stackName)
  ].slice(0, 20);
  // console.log(SaveArr);

  localStorage.setItem(SEARCHED_STACK_STORAGE_NAME, SaveArr.join(','));
}