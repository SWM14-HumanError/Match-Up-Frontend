import {useEffect, useState} from 'react';
import Navigation from '../../components/navigation/Navigation.tsx';
import Footer from '../../components/Footer.tsx';
import Markdown from 'react-markdown';

import '../../styles/MainProjectPage.scss';
import '../../styles/components/Terms.scss';

function TermsOfInfo() {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    fetch('/TermsOfInfo.txt')
      .then(res => res.text())
      .then(text => setText(text));
  }, []);

  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>개인정보이용약관</h1>

        <div className='terms_markdown_layout'>
          <Markdown>{text}</Markdown>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default TermsOfInfo;