import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
// import ImgUpload from '@components/inputs/ImgUpload.tsx';
import Footer from '@components/Footer.tsx';
import {ICompanyAuthRequest} from '@constant/interfaces.ts';
import {InitCompanyAuthRequest} from '@constant/initData.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';

function MentorAuthPage() {
  const navigate = useNavigate();
  // const [base64, setBase64] = useState<string | null>(null);
  // const [base64FileName, setBase64FileName] = useState<string>('');
  const [companyRequest, setCompanyRequest] = useState<ICompanyAuthRequest>(InitCompanyAuthRequest);

  // const companyImageRef = useRef<HTMLDivElement>(null);
  const companyContentsRef = useRef<HTMLTextAreaElement>(null);
  const companyEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Api.fetch2Json('/api/v1/mentoring/verify')
    //   .then(data => setMentorRequest({
    //     ...data,
    //     roleType: getTechListKor(data.roleType)
    //   }));
  }, []);

  function submit() {
    // if (!base64 || !base64FileName) {
    //   Alert.show('증명서를 업로드 해주세요');
    //   companyImageRef.current?.focus();
    //   return;
    // }

    if (!companyRequest.content) {
      Alert.show('기업 담당자님의 소개를 입력해주세요');
      companyContentsRef.current?.focus();
      return;
    }

    if (!companyRequest.enterpriseEmail) {
      Alert.show('기업 담당자님의 이메일을 입력해주세요');
      companyContentsRef.current?.focus();
      return;
    }

    Api.fetch('/api/v1/enterprise/verify', /*companyRequest.verifyId ? 'PUT' :*/ 'POST', {
      ...companyRequest,
      // imageName: base64FileName,
      // imageBase64: base64
    })
      .then(res => {
        if (res?.ok) {
          Alert.show('인증신청이 완료되었습니다.');
          navigate('/project', {replace: true});
        }
        else
          throw new Error(res?.statusText + ' ' + res?.status);
      })
      .catch(e => {
        Alert.show('인증신청에 실패했습니다.');
        console.error(e);
      });
  }

  /*
  'content': '기업 담당자의 설명', @NotNull
  'enterpriseEmail': 'example@enterprise.com', 이메일 형식
  'certificateName': '사업자 등록증 파일 이름', null 가능
  'certificateBase64': '사업자 등록증 파일 Base64' null 가능
  */

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>기업 인증</h1>

        <div className='team_update_layout'>
          {/*<div className='team_title_layout'>*/}
          {/*  <div>*/}
          {/*    <h2>재직 증명서 업로드</h2>*/}
          {/*    <ImgUpload prevImgUrl={null} // 기본 이미지*/}
          {/*               messageStart='기업 인증'*/}
          {/*               setFileName={setBase64FileName}*/}
          {/*               setBase64={setBase64}*/}
          {/*               ref={companyImageRef}/>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <h2 className='essential'>기업 담당자 소개</h2>
          <textarea value={companyRequest.content}
                    placeholder='기업 담당자님을 소개해주세요'
                    ref={companyContentsRef}
                    onChange={e => setCompanyRequest(prev => ({...prev, content: e.target.value}))}/>

          <h2 className='essential'>기업 담당자 이메일</h2>
          <input type='email'
                 value={companyRequest.enterpriseEmail}
                 placeholder='example@enterprise.com'
                 ref={companyEmailRef}
                 onChange={e => setCompanyRequest(prev => ({...prev, enterpriseEmail: e.target.value}))}/>

          <div className='submit_button_layout'>
            <button type={'submit'} onClick={submit}>인증신청</button>
            <button className='cancel'
                    onClick={() => {
                      const result = window.confirm('인증신청을 취소하시겠습니까? \n작성한 내용은 저장되지 않습니다.');
                      if (result) navigate('/project', {replace: true});
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