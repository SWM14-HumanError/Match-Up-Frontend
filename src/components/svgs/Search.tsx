import {ISvg} from '@constant/interfaces.ts';

interface ISearch extends ISvg {
  color?: string;
}
function Search({width=62, height=62, color='white'}: ISearch) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 62 62' fill='none'>
      {/*<rect width='62' height='62' rx='5' fill='#0064FF'/>*/}
      <circle cx='29.6486' cy='29.6486' r='7.64865' stroke={color} strokeWidth='2'/>
      <path d='M35.0541 35.0547L41 41.0006' stroke={color} strokeWidth='2'/>
    </svg>
  );
}

export default Search;