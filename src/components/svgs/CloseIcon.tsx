import {ISvg} from '../../constant/interfaces.ts';

interface ICloseIcon extends ISvg {
  round?: boolean;
}

function CloseIcon({width=28, height=28, round=false}: ICloseIcon) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 28 28' fill='none'>
      <path d='M22 6L6 22' stroke='#777777' strokeWidth='2' strokeLinecap={round ? 'round' : 'inherit'}/>
      <path d='M22 22L6 6' stroke='#777777' strokeWidth='2' strokeLinecap={round ? 'round' : 'inherit'}/>
    </svg>
  );
}

export default CloseIcon;