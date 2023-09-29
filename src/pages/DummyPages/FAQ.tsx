import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';

function FAQ() {
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>FAQ</h1>
        {Array.from({length: 40}).map(() => (<br/>))}
      </div>

      <Footer/>
    </>
  );
}

export default FAQ;