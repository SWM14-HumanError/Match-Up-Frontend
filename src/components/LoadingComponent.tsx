import '@styles/MainProjectPage.scss';

function LoadingComponent() {
  function Loading() {
    const text = 'Loading...';
    const result = [];

    for (const c of text)
      result.push(<span key={result.length}>{c}</span>);
    return result;
  }
  return (
    <div className='loading_layout'>
      <div className='loading'/>
      <div className='loading_text_layout'>
        {Loading()}
      </div>
    </div>
  );
}

export default LoadingComponent;