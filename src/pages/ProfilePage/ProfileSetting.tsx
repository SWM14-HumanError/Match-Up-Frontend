import Navigation from '../../components/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';

function TermsOfService() {
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>프로필 설정</h1>
        {Array.from({length: 40}).map(() => (<br/>))}
      </div>

      <Footer/>
    </>
  );
}

export default TermsOfService;