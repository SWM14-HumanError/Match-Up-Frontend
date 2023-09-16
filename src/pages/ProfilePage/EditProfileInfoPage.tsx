import {useRef, useState} from 'react';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import ImgUpload from '../../components/inputs/ImgUpload.tsx';
import SelectStackLevelList from '../../components/inputs/SelectStackLevelList.tsx';
import '../../styles/MainProjectPage.scss';

function EditProjectInfoPage() {
  const FileInput = useRef<HTMLInputElement>(null);
  const [userProfileData, setUserProfileData] = useState({text: '', userPositionLevels: {}});
  const [base64, setBase64] = useState<string | null>(null);

  console.log(FileInput.current?.files);
  //Todo: 펀집 페이지 작성

  function submit() {
    if (!base64) return;

    // const formData = new FormData();
    // formData.append('image', base64);
    // formData.append('text', userProfileData.text);
    // formData.append('userPositionLevels', JSON.stringify(userProfileData.userPositionLevels));
    //
    // fetch('http://localhost:3001/api/user/profile', {
    //   method: 'POST',
    //   body: formData,
    // }).then(res => res.json()).then(res => {
    //   console.log(res);
    // });
  }

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>프로필 수정</h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>프로필 이미지</h2>
              <ImgUpload setBase64={setBase64}/>
            </div>

            <div>
              <h2>닉네임</h2>
              <div className='inputs_layout'>
                <input type='text' placeholder='닉네임을 입력해주세요'/>
              </div>

              <h2>관심 분야</h2>
              <div className='inputs_layout'>
                <SelectBox options={['개발', '디자인', '기획', '기타']}/>
                <SelectBox options={['프론트엔드', '백엔드', '네이티브 앱', '임베디드', '게임']}/>
              </div>
            </div>
          </div>

          <h2>자기소개</h2>
          <textarea placeholder='내용을 작성해 주세요'/>

          <h2>선호 지역 및 시간</h2>
          <div className='inputs_layout'>
            <SelectBox options={['온라인', '오프라인']}/>
            <SelectBox options={['서울', '경기', '인천', '대전', '충북', '충남', '부산', '울산', '경북', '경남', '대구', '광주', '전북', '전남', '제주', '강원']}/>
            <input type='text'
                   placeholder='세부 주소를 입력해주세요'
                   value={userProfileData.text}
                   onChange={e => setUserProfileData(prev => ({
                     ...prev,
                      text: e.target.value,
                   }))}/>
          </div>

          <h2>능력치</h2>

          <SelectStackLevelList className='member_selector_layout'
                                setData={data => setUserProfileData(prev => ({
                                  ...prev,
                                  userPositionLevels: data,
                                }))}/>

          <div className='submit_button_layout'>
            <button type={'submit'} onClick={submit}>저장하기</button>
            <button type={'submit'} className='danger'>회원 탈퇴</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default EditProjectInfoPage;