import '../../styles/MainProjectPage.scss';

interface IStarCount {
  count: number,
}
function StarCount({count}: IStarCount) {
  return (
    <div className='star_count_layout'>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M7.03659 0.866507L8.09247 2.99573C8.23645 3.29213 8.62041 3.57642 8.94438 3.63086L10.8582 3.95146C12.082 4.15712 12.37 5.05235 11.4881 5.93549L10.0003 7.43563C9.74829 7.68968 9.6103 8.17964 9.68829 8.53048L10.1142 10.3875C10.4502 11.8574 9.67629 12.426 8.38644 11.6578L6.59264 10.5871C6.26867 10.3935 5.73474 10.3935 5.40477 10.5871L3.61095 11.6578C2.3271 12.426 1.54719 11.8513 1.88315 10.3875L2.3091 8.53048C2.38709 8.17964 2.24911 7.68968 1.99714 7.43563L0.509302 5.93549C-0.366599 5.05235 -0.084631 4.15712 1.13923 3.95146L3.05302 3.63086C3.37098 3.57642 3.75494 3.29213 3.89892 2.99573L4.95482 0.866507C5.53076 -0.288836 6.46665 -0.288836 7.03659 0.866507Z" fill="#FFD43E"/>
      </svg>

      <p>{count}</p>
    </div>
  );
}

export default StarCount;