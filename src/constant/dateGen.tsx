import {ITechStack} from './interfaces.ts';
import {DefaultStack} from './initData.ts';
import stackList from './stackList.ts';

const dataGen = {
  getRelativeDate: (date: string) => {
    const curr = new Date();
    const diff = curr.getTime() - new Date(date).getTime();

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);

    if (years > 0)
      return `${years}년 전`;
    else if (days > 0)
      return `${days} 일 전`;
    else if (hours > 0)
      return `${hours}시간 전`;
    else if (minutes > 0)
      return `${minutes}분 전`;
    else if (seconds > 0)
      return `${seconds}초 전`;
    else
      return '지금';
  },
  getTechStack: (name: string) :ITechStack => {
    const normalizedStack = name.toLowerCase().replace(/\./g, '');
    const techStack = stackList.filter(tech => tech.tagName === normalizedStack);

    if (techStack.length > 0)
      return techStack[0];
    return DefaultStack;
  },
  getUniqueTechStacks: (techStacks: ITechStack[]|null) :ITechStack[] => {
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
  },
  getUniqueStrings: (strs: string[]|null) :string[] => {
    if (!strs) return [];

    const sets = new Set<string>();
    strs.forEach(v => sets.add(v));

    return Array.from(sets);
  },
  string2Html: (str: string) => {
    return str.split('\n').map((v, i) => (
      <span key={i}>
        {i > 0 && <br/>}
        {v}
      </span>
    ));
  },
  scrollToElementById: (id: string) => {
    if (!id) return;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  },
  text2Dom: (text: string|null) => {
    if (!text) return null;

    const linkRegex = /(http(s)?:\/\/[^\s]+)(?![^\s])/g;

    return text?.split('\n').map((part, i) => (
      <span key={i * 2000}>
        {i !== 0 && <br />}
        {part.split(linkRegex).map((urlString, index) => {
          if (urlString && urlString.match(linkRegex)) {
            return (
              <a key={index} href={urlString} target='_blank' rel='noopener noreferrer'>
                {urlString}
              </a>
            );
          }

          return <span key={index}>{urlString}</span>;
        })}
      </span>
    ));
  }
}

export default dataGen;