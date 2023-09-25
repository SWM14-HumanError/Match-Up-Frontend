import Navigation from '../../components/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';

function Inquiry() {
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>1:1 문의</h1>
        {Array.from({length: 40}).map(() => (<br/>))}
      </div>

      <Footer/>
    </>
  );
}

export default Inquiry;