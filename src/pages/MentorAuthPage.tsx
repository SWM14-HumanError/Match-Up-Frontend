import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/navigation/Navigation.tsx';
import ImgUpload from '../components/inputs/ImgUpload.tsx';
import Footer from '../components/Footer.tsx';

import '../styles/MainProjectPage.scss';

function MentorAuthPage() {
  const navigate = useNavigate();
  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');

  function submit() {
    if (!base64 || !base64FileName) return;
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>멘토 인증</h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2 className='essential'>증명서 업로드</h2>
              <ImgUpload prevImgUrl={null}
                         base64Img={base64}
                         setFileName={setBase64FileName}
                         setBase64={setBase64}/>
            </div>

            <div>
              <h2>직무</h2>
              <div className='inputs_layout'>
                <input type='text'
                       maxLength={49}
                       placeholder='직무를 입력해주세요'/>
              </div>

              <h2>경력</h2>
              <div className='inputs_layout'>
                <input type='text'
                       maxLength={49}
                       placeholder='경력을 입력해주세요'/>
              </div>
            </div>
          </div>

          <h2>멘토 소개</h2>
          <textarea placeholder='내용을 작성해 주세요'/>

          <div className='submit_button_layout'>
            <button type={'submit'} onClick={submit}>인증신청</button>
            <button className='cancel'
                    onClick={() => {
                      const result = window.confirm('인증신청을 취소하시겠습니까? \n작성한 내용은 저장되지 않습니다.');
                      if (result) navigate('/mypage/profile', {replace: true});
                    }}>
              보류하기
            </button>
          </div>
        </div>

      </div>

      <Footer/>
    </>
  );
}

export default MentorAuthPage;