import '../styles/MainProjectPage.scss';
import {useState} from "react";

function SignInTerms() {
  const [isAgree, setIsAgree] = useState(false);

  return (
    <div className='main_layout'>
      <h1>SignInTerms</h1>

      <div className='scroll_layout'>

      </div>

      <label>
        <input type="checkbox" checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
        <h4>전체 동의 하기</h4>
        <span>실명 인증 된 아이디로 어쩌구...</span>
      </label>

      <button>
        회원가입
      </button>
    </div>
  );
}

export default SignInTerms;