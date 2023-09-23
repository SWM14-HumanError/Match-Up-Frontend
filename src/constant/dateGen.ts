import {ITechStack} from "./interfaces.ts";
import stackList from "./stackList.ts";

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
      return `${years} 년 전`;
    else if (days > 0)
      return `${days} 일 전`;
    else if (hours > 0)
      return `${hours} 시간 전`;
    else if (minutes > 0)
      return `${minutes} 분 전`;
    else if (seconds > 0)
      return `${seconds} 초 전`;
    else
      return 'Just now';
  },
  getTechStack: (name: string) :ITechStack => {
    const normalizedStack = name.toLowerCase().replace(/\./g, '');
    const techStack = stackList.filter(tech => tech.tagName === normalizedStack);

    if (techStack.length > 0)
      return techStack[0];
    return {
      tagID: 999,
      tagName: normalizedStack,
      url: ''
    };
  }
}

export default dataGen;