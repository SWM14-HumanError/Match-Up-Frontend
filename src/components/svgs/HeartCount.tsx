import '@styles/MainProjectPage.scss';

interface IHeartCount {
  count: number,
}
function HeartCount({count}: IHeartCount) {
  return (
    <div className='heart_count_layout'>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
        <path d="M6.372 10.626C6.168 10.698 5.832 10.698 5.628 10.626C3.888 10.032 0 7.554 0 3.354C0 1.5 1.494 0 3.336 0C4.428 0 5.394 0.528 6 1.344C6.606 0.528 7.578 0 8.664 0C10.506 0 12 1.5 12 3.354C12 7.554 8.112 10.032 6.372 10.626Z"
              fill="#FF8E8E"/>
      </svg>

      <p>{count}</p>
    </div>
  );
}

export default HeartCount;