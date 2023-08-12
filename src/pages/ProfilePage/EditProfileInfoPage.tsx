import {useRef} from 'react';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Camera from '../../components/svgs/Camera.tsx';
import SelectStackLevel from '../../components/inputs/SelectStackLevel.tsx';
import '../../styles/MainProjectPage.scss';

function EditProjectInfoPage() {
  const FileInput = useRef<HTMLInputElement>(null);

  console.log(FileInput.current?.files);

  return (
    <>
      <Navigation/>

      <div className='main_layout'>
        <h1>프로필 수정</h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>프로필 이미지</h2>
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
                  대표 프로필 이미지를 첨부 <br/>
                  최대 100MB까지 첨부가능해요. <br/>
                  (JPG, PNG, GIF 가능)
                </p>
              </div>
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
            <input type='text' placeholder='세부 주소를 입력해주세요'/>
          </div>

          <h2>능력치</h2>
          <ul className='member_selector_layout'>
            {[1, 2, 3].map(_ => (
              <SelectStackLevel/>
            ))}
          </ul>

          <div className='submit_button_layout'>
            <button type={'submit'}>저장하기</button>
            <button type={'submit'} className='danger'>회원 탈퇴</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default EditProjectInfoPage;