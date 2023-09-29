import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';

function TermsOfInfo() {
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>개인정보이용약관</h1>
        {Array.from({length: 40}).map(() => (<br/>))}
      </div>

      <Footer/>
    </>
  );
}

export default TermsOfInfo;