import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation.tsx';
import Camera from '../components/svgs/Camera.tsx';

import '../styles/MainProjectPage.scss';

function MentorAuthPage() {
  const navigate = useNavigate();
  const FileInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>멘토 인증</h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>증명서 업로드</h2>
              <div className='upload_layout'>
                <div className='upload_image' onClick={() => FileInput.current?.click()}>
                  { !!(FileInput.current?.files?.length) ? (
                    <img src={URL.createObjectURL(FileInput.current.files[0])} alt='대표 이미지'/>
                  ) : (
                    <div className='upload_demo'>
                      <Camera/>
                    </div>
                  )}
                  <input type='file' accept='image/*' ref={FileInput}/>
                </div>
                <p>
                  증명서 PDF 또는 이미지를 첨부 <br/>
                  최대 100MB까지 첨부가능해요. <br/>
                  (JPG, PNG, GIF 가능)
                </p>
              </div>
            </div>

            <div>
              <h2>직무</h2>
              <div className='inputs_layout'>
                <input type='text' placeholder='직무를 입력해주세요'/>
              </div>

              <h2>경력</h2>
              <div className='inputs_layout'>
                <input type='text' placeholder='경력을 입력해주세요'/>
              </div>
            </div>
          </div>

          <h2>멘토 소개</h2>
          <textarea placeholder='내용을 작성해 주세요'/>

          <div className='submit_button_layout'>
            <button type={'submit'}>인증신청</button>
            <button className='cancel'
                    onClick={() => {
                      const result = window.confirm('인증신청을 취소하시겠습니까? \n작성한 내용은 저장되지 않습니다.');
                      if (result) navigate(-1);
                    }}>
              보류하기
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default MentorAuthPage;