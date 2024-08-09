import {useEffect, useState} from 'react';
import Navigation from '@components/navigation/Navigation.tsx';
import Footer from '@components/Footer.tsx';
import Markdown from 'react-markdown';

import '@styles/MainProjectPage.scss';
import '@styles/components/Terms.scss';

function TermsOfService() {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    fetch('/TermsOfService.txt')
      .then(res => res.text())
      .then(text => setText(text));
  }, []);

  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>서비스 이용약관</h1>

        <div className='terms_markdown_layout'>
          <Markdown>{text}</Markdown>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default TermsOfService;