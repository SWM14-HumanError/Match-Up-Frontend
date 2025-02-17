import {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import ImgUpload from '@components/inputs/ImgUpload.tsx';
import Footer from '@components/Footer.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import MentoringTechStackList from '@components/inputs/MentoringTechStackList.tsx';
import {IEditMainMentoringRequest} from '@constant/interfaces.ts';
import {CareerOptions, TechTypeOptions} from '@constant/selectOptions.ts';
import {InitMentoringRequest} from '@constant/initData.ts';
import authControl from '@constant/authControl.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';

function EditMentoringPage() {
  const mentoringId = useParams().mentoringId;
  const navigate = useNavigate();

  const MentoringTitleRef = useRef<HTMLInputElement>(null);
  const MentoringContentsRef = useRef<HTMLTextAreaElement>(null);
  const MentoringRoleRef = useRef<HTMLSelectElement>(null);

  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');
  const [mentoringData, setMentoringData] = useState<IEditMainMentoringRequest>(InitMentoringRequest);

  const token = authControl.getInfoFromToken();
  if (!token) {
    window.location.href = '/login';
    Alert.show('로그인 후 이용해주세요.');
  }

  useEffect(() => {
    if (!mentoringId)
      return;

    Api.fetch2Json(`/api/v1/mentoring/${mentoringId}`)
      .then(data => setMentoringData({
        ...data,
        roleType: data.roleType,
      }));
  }, [mentoringId]);

  function getNormalizedProjectData(data: IEditMainMentoringRequest) {
    if (!mentoringData.title) {
      MentoringTitleRef.current?.focus();
      Alert.show('멘토링 제목을 입력해주세요.');
      return;
    }

    if (!mentoringData.content) {
      MentoringContentsRef.current?.focus();
      Alert.show('멘토링 설명을 입력해주세요.');
      return;
    }

    if (!mentoringData.roleType) {
      MentoringRoleRef.current?.focus();
      Alert.show('멘토링의 직무를 설정해주세요.');
      return;
    }

    // 이미지 base64로 변환
    const normalize: IEditMainMentoringRequest = {
      title: data.title,
      content: data.content,
      stacks: data.stacks,
      roleType: data.roleType,
      career: data.career,
      imageName: base64FileName,
      imageBase64: base64,
    };

    return normalize;
  }

  function submitProjectInfo() {
    const NormalizedProjectData = getNormalizedProjectData(mentoringData);
    if (!NormalizedProjectData) return;

    (mentoringId ? // 멘토링 수정 시
        Api.fetch(`/api/v1/mentoring/${mentoringId}`, 'PUT', NormalizedProjectData) : // 멘토링 생성 시
        Api.fetch(`/api/v1/mentoring`, 'POST', NormalizedProjectData)
    )
      .then(async res => {
        if (!res || res.status >= 400)
          throw new Error('멘토링 생성/수정 API 요청 실패\n' + await res?.text());
        else if (res.ok && !!mentoringId)
          navigate(`/mentor?mentoringId=${mentoringId}`);
        else {
          navigate('/mentor');
        }
      })
      .catch(e => console.error('멘토링 생성/수정 API 요청 :', e));
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>
          {mentoringId ? `멘토링 수정하기` : `멘토링 만들기`}
        </h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>멘토링 대표 이미지</h2>
              <ImgUpload prevImgUrl={mentoringData.thumbnailUrl ?? null}
                         messageStart='멘토링에'
                         setFileName={setBase64FileName}
                         setBase64={setBase64}/>
            </div>

            <div>
              <h2 className='essential'>멘토링 제목</h2>
              <div className='inputs_layout'>
                <input type='text'
                       ref={MentoringTitleRef}
                       maxLength={29}
                       placeholder='멘토링 제목을 입력해주세요'
                       value={mentoringData.title}
                       onChange={e =>
                         setMentoringData(prev => ({...prev, title: e.target.value}))}/>
              </div>

              <h2 className='essential'>경력 및 직무</h2>
              <div className='inputs_layout'>
                <SelectBox selectRef={MentoringRoleRef}
                           options={TechTypeOptions}
                           value={mentoringData.roleType}
                           onChange={value => setMentoringData(prev => ({...prev, roleType: value}))}/>
                <SelectBox options={CareerOptions}
                           hasDefault={false}
                           value={mentoringData.career}
                           onChange={value => setMentoringData(prev => ({...prev, career: value}))}/>
              </div>
            </div>
          </div>

          <h2>기술 스택</h2>
          <MentoringTechStackList stacks={mentoringData.stacks}
                                  onChange={value => setMentoringData(prev => ({
                                    ...prev,
                                    stacks: value,
                                  }))}/>


          <h2 className='essential'>멘토링 소개</h2>
          <textarea placeholder='멘토링 내용을 작성해 주세요'
                    ref={MentoringContentsRef}
                    maxLength={699}
                    value={mentoringData.content}
                    onChange={e =>
                      setMentoringData(prev => ({...prev, content: e.target.value}))}/>


          <div className='submit_button_layout'>
            <button onClick={submitProjectInfo}>
              저장하기
            </button>

            <button className='cancel'
                    onClick={() => {
                      const confirm = window.confirm('작성한 내용이 저장되지 않습니다. \n정말로 취소하시겠습니까?');
                      if (confirm) navigate(`/mentor`, {replace: true});
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

export default EditMentoringPage;