import {useState} from 'react';
import '../styles/MainProjectPage.scss';

function SignInTerms() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  function saveAdditionalInfo() {
    setIsSubmitting(true);
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        positionLevel: 1,
        userBirthday: "1982-03-10",
        userLevel: 2,
        address: "서울",
        expYear: 2,
        expertize: [
          "스프링"
        ],
        meetingType: "ONLINE",
        position: "Back-end"
      })
    })
      .then(res => {
        if (res.status < 300) {
          setIsSubmitting(false);

          const redirectUrl = localStorage.getItem('redirectUrl');
          window.location.href = redirectUrl ? redirectUrl : '/';
        }
      })
  }

  return (
    <div className='main_layout'>
      <h1>회원가입</h1>

      <div className='signup_terms_layout'>
        <div className='scroll_layout'>
          <h2>이용약관</h2>

          <h2>개인정보처리방침</h2>
        </div>

        <label>
          <input type='checkbox' checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
          <h4>전체 동의 하기</h4>
          <span>실명 인증 된 아이디로 어쩌구...</span>
        </label>

        <button disabled={!isAgree}>
          동의하고 다음으로 넘어가기
        </button>
      </div>

      <div className='additional_info_layout'>

        <h2>positionLevel</h2>
        <input type="number"/>

        <h2>userBirthday</h2>
        <input type="date"/>

        <h2>userLevel</h2>
        <input type="number"/>

        <h2>address</h2>
        <input type="text"/>

        <h2>expYear</h2>
        <input type="number"/>

        <h2>expertize</h2>
        <input type="text"/>
        <input type="text"/>

        <h2>meetingType</h2>
        <input type="text"/>

        <h2>position</h2>
        <input type="text"/>

        <button onClick={saveAdditionalInfo}
                disabled={isSubmitting}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignInTerms;