import {ISvg} from "../../constant/interfaces.ts";

function CloseIcon({width=28, height=28}: ISvg) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 28 28" fill="none">
      <path d="M22 6L6 22" stroke="#777777" strokeWidth="2"/>
      <path d="M22 22L6 6" stroke="#777777" strokeWidth="2"/>
    </svg>
  );
}

export default CloseIcon;