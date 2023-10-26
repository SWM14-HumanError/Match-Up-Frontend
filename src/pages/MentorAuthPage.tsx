import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/navigation/Navigation.tsx';
import ImgUpload from '../components/inputs/ImgUpload.tsx';
import Footer from '../components/Footer.tsx';
import SelectBox from '../components/inputs/SelectBox.tsx';
import {getTechListEng, getTechListKor, TechListKor} from '../components/inputs/SelectStackLevel.tsx';
import {CareerOptions} from '../constant/selectOptions.ts';
import {IMentorAuthRequest} from '../constant/interfaces.ts';
import {InitMentorAuthRequest} from '../constant/initData.ts';
import Alert from '../constant/Alert.ts';
import Api from '../constant/Api.ts';

import '../styles/MainProjectPage.scss';

function MentorAuthPage() {
  const navigate = useNavigate();
  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');
  const [mentorRequest, setMentorRequest] = useState<IMentorAuthRequest>(InitMentorAuthRequest);

  useEffect(() => {
    Api.fetch2Json('/api/v1/mentoring/verify')
      .then(data => setMentorRequest({
        ...data,
        roleType: getTechListKor(data.roleType)
      }));
  }, []);

  function submit() {
    if (!base64 || !base64FileName) return;

    Api.fetch('/api/v1/mentoring/verify', mentorRequest.verifyId ? 'PUT' : 'POST', {
      ...mentorRequest,
      imageName: base64FileName,
      imageBase64: base64,
      roleType: getTechListEng(mentorRequest.roleType),
    })
      .then(res => {
        if (res?.ok) {
          Alert.show('인증신청이 완료되었습니다.');
          navigate('/mypage/profile', {replace: true});
        }
      })
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
              <ImgUpload prevImgUrl={mentorRequest.thumbnailUrl}
                         setFileName={setBase64FileName}
                         setBase64={setBase64}/>
            </div>

            <div>
              <h2>직무</h2>
              <div className='inputs_layout'>
                <SelectBox options={TechListKor}
                           value={mentorRequest.roleType}
                           onChange={value => setMentorRequest(prev => ({...prev, roleType: value}))}/>
              </div>

              <h2>경력</h2>
              <div className='inputs_layout'>
                <SelectBox options={CareerOptions}
                           hasDefault={false}
                           value={mentorRequest.career}
                           onChange={value => setMentorRequest(prev => ({...prev, career: value}))}/>
              </div>
            </div>
          </div>

          <h2 className='essential'>멘토 소개</h2>
          <textarea value={mentorRequest.content}
                    placeholder='내용을 작성해 주세요'
                    onChange={e => setMentorRequest(prev => ({...prev, content: e.target.value}))}/>

          <h2>멘토 링크</h2>
          <input type='text'
                 value={mentorRequest.link}
                 placeholder='github 링크 or 블로그 링크'
                 onChange={e => setMentorRequest(prev => ({...prev, link: e.target.value}))}/>

          <div className='submit_button_layout'>
            <button type={'submit'} onClick={submit}>인증신청</button>
            <button className='cancel'
                    onClick={() => {
                      const result = window.confirm('인증신청을 취소하시겠습니까? \n작성한 내용은 저장되지 않습니다.');
                      if (result) navigate('/mypage/profile', {replace: true});
                    }}>
              취소하기
            </button>
          </div>
        </div>

      </div>

      <Footer/>
    </>
  );
}

export default MentorAuthPage;