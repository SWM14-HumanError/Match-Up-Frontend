import '../styles/MainProjectPage.scss';

function LoadingComponent() {
  function Loading() {
    const text = 'Loading...';
    const result = [];

    for (let c of text)
      result.push(<span>{c}</span>);
    return result;
  }
  return (
    <div className='loading_layout'>
      <div className='loading'/>
      <span>
        {Loading()}
      </span>
    </div>
  );
}

export default LoadingComponent;