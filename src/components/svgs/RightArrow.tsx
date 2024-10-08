import {ISvg} from "@constant/interfaces.ts";

function RightArrow({width=8, height=16, rotate}: ISvg & {rotate?: number}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} transform={`rotate(${rotate})`} viewBox="0 0 8 16" fill="none">
      <path d="M8 8.00001C8 8.64611 7.74876 9.2922 7.25559 9.78138L1.18872 15.7992C0.918876 16.0669 0.472233 16.0669 0.202385 15.7992C-0.0674618 15.5316 -0.0674618 15.0885 0.202385 14.8209L6.26926 8.80301C6.7159 8.35998 6.7159 7.64005 6.26926 7.19701L0.202385 1.17912C-0.0674624 0.911451 -0.0674625 0.468416 0.202385 0.200749C0.472232 -0.0669174 0.918875 -0.0669175 1.18872 0.200749L7.25559 6.21864C7.74876 6.70783 8 7.35392 8 8.00001Z" fill="#777777"/>
    </svg>
  );
}

export default RightArrow;