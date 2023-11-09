import {ISvg} from '../../constant/interfaces.ts';

interface FeedbackUserIconProps extends ISvg {
  color?: string;
}

function FeedbackUserIcon({width = 39, height = 39, color = '#F1F1F1'}: FeedbackUserIconProps) {
  return (
    <svg width={width} height={height} viewBox='0 0 39 39' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.5' y='0.5' width='38' height='38' rx='4.5' fill={color} stroke='#E1E1E1'/>
      <g opacity='0.4'>
        <path
          d='M19.6579 18.6166C23.2603 18.6166 26.1806 15.6963 26.1806 12.0939C26.1806 8.49158 23.2603 5.57129 19.6579 5.57129C16.0556 5.57129 13.1353 8.49158 13.1353 12.0939C13.1353 15.6963 16.0556 18.6166 19.6579 18.6166Z'
          fill='#999999'/>
        <path
          d='M19.6582 21.8784C13.1225 21.8784 7.8 26.2616 7.8 31.6624C7.8 32.0277 8.087 32.3146 8.45227 32.3146H30.8641C31.2294 32.3146 31.5164 32.0277 31.5164 31.6624C31.5164 26.2616 26.1939 21.8784 19.6582 21.8784Z'
          fill='#999999'/>
      </g>
    </svg>
  );
}

export default FeedbackUserIcon;