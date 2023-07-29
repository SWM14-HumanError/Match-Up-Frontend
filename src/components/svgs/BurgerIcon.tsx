import {ISvg} from "../../constant/interfaces.ts";

function BurgerIcon({width=16, height=16}: ISvg) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="2" r="1.5" fill="#D9D9D9"/>
      <circle cx="8" cy="8" r="1.5" fill="#D9D9D9"/>
      <circle cx="8" cy="14" r="1.5" fill="#D9D9D9"/>
    </svg>
  );
}

export default BurgerIcon;