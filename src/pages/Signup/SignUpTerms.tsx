import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Markdown from 'react-markdown';

import '../../styles/SigninTerms.scss';
import '../../styles/components/Terms.scss';

function SignUpTerms() {
  const navigate = useNavigate();
  const params = useLocation();
  const queryParams = new URLSearchParams(params.search);
  const email = queryParams.get('email');
  const id = queryParams.get('id');

  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const [serviceText, setServiceText] = useState<string>('');
  const [infoText, setInfoText] = useState<string>('');

  useEffect(() => {
    if (!email || !id) {
      navigate('/');
      return;
    }

    fetch('/TermsOfService.txt')
      .then(res => res.text())
      .then(text => setServiceText(text));

    fetch('/TermsOfInfo.txt')
      .then(res => res.text())
      .then(text => setInfoText(text));
  }, []);

  useEffect(() => {
    if (isTermsAgree && isPrivacyAgree)
      setIsAgree(true);
    else
      setIsAgree(false);
  }, [isTermsAgree, isPrivacyAgree]);

  // function AgreeTerms() {
  //   Api.fetch(`api/v1/login/user/term?email=${email}&id=${id}`)
  //     .then(async res => {
  //       if (!res?.ok) return;
  //       const token = await res.text();
  //       authControl.setToken(token);
  //
  //       navigate('/join/additional-info');
  //     })
  //     .catch(e => console.error('회원가입에 실패했습니다.', e));
  // }

  return (
    <div className='main_layout'>
      <h1>회원가입</h1>

      <div className='signup_terms_layout'>

        <h2>서비스 이용약관</h2>
        <div className='scroll_layout terms_markdown_layout'>
          <Markdown>{serviceText}</Markdown>
        </div>
        <label>
          <input type='checkbox'
                 checked={isTermsAgree}
                 onChange={e => setIsTermsAgree(e.target.checked)}/>
          서비스 이용약관에 동의 합니다
        </label>

        <h2>개인정보처리방침</h2>
        <div className='scroll_layout terms_markdown_layout'>
          <Markdown>{infoText}</Markdown>
        </div>
        <label>
          <input type='checkbox'
                 checked={isPrivacyAgree}
                 onChange={e => setIsPrivacyAgree(e.target.checked)}/>
          서비스 이용약관에 동의 합니다
        </label>

        <label>
          <input type='checkbox'
                 checked={isAgree}
                 onChange={e => {
                   setIsTermsAgree(e.target.checked);
                   setIsPrivacyAgree(e.target.checked);
                   setIsAgree(e.target.checked);
                 }} />
          <strong>전체 동의 하기</strong>
        </label>

        <button onClick={() => navigate('/join/additional-info' + params.search)}
                disabled={!isAgree}>
          다음으로
        </button>
      </div>
    </div>
  );
}

export default SignUpTerms;