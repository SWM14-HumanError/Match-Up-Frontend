import {ISvg} from '@constant/interfaces.ts';

function Hamburger({width=28, height=28}: ISvg) {
  return (
    <svg width={width} height={height} viewBox='3 3 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5 7H19' stroke='#777777' strokeWidth='1.5' strokeLinecap='round'/>
      <path d='M5 12H19' stroke='#777777' strokeWidth='1.5' strokeLinecap='round'/>
      <path d='M5 17H19' stroke='#777777' strokeWidth='1.5' strokeLinecap='round'/>
    </svg>
  )
}

export default Hamburger;