import {ISvg} from '../../constant/interfaces.ts';

function UserOnlyIcon({width=31, height=31}: ISvg) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31 31' fill='none'>
        <path d='M15.6417 14.7073C18.8746 14.7073 21.4954 12.0865 21.4954 8.85365C21.4954 5.62077 18.8746 3 15.6417 3C12.4089 3 9.78809 5.62077 9.78809 8.85365C9.78809 12.0865 12.4089 14.7073 15.6417 14.7073Z' fill='#999999'/>
        <path d='M15.642 17.6343C9.77658 17.6343 5 21.5679 5 26.4148C5 26.7426 5.25756 27.0001 5.58537 27.0001H25.6986C26.0264 27.0001 26.2839 26.7426 26.2839 26.4148C26.2839 21.5679 21.5074 17.6343 15.642 17.6343Z' fill='#999999'/>
    </svg>
  );
}

export default UserOnlyIcon;