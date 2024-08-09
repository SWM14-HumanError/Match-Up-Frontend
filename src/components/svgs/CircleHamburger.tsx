import {ISvg} from '@constant/interfaces.ts';

interface ICircleHamburger extends ISvg {
  fill?: string;
}

function CircleHamburger({width=16, height=16, fill='#D9D9D9'}: ICircleHamburger) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 16 16' fill='none'>
      <circle cx='8' cy='2' r='1.5' fill={fill}/>
      <circle cx='8' cy='8' r='1.5' fill={fill}/>
      <circle cx='8' cy='14' r='1.5' fill={fill}/>
    </svg>
  );
}

export default CircleHamburger;