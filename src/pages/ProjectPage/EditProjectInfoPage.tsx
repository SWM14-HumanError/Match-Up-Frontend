import {useRef} from "react";
import {useParams} from "react-router-dom";
import Navigation from "../../components/Navigation.tsx";
import SelectBox from "../../components/inputs/SelectBox.tsx";
import Camera from "../../components/svgs/Camera.tsx";
import SelectTeamMember from "../../components/inputs/SelectTeamMember.tsx";
import '../../styles/MainProjectPage.scss';

function EditProjectInfoPage() {
  const projectId = useParams().projectId;
  const FileInput = useRef<HTMLInputElement>(null);

  console.log(FileInput.current?.files);

  return (
    <>
      <Navigation isLogin={false}/>

      <div className="main_layout">
        <h1>
          {projectId ? `모임 수정하기` : `모임 만들기`}
        </h1>

        <div className='team_update_layout'>
          <div className='team_title_layout'>
            <div>
              <h2>모임 대표 이미지</h2>
              <div className='upload_layout'>
                <div className='upload_image' onClick={() => FileInput.current?.click()}>
                  { !!(FileInput.current?.files?.length) ? (
                      <img src={URL.createObjectURL(FileInput.current.files[0])} alt="대표 이미지"/>
                    ) : (
                    <div className='upload_demo'>
                      <Camera/>
                    </div>
                  )}
                  <input type="file" accept='image/*' ref={FileInput}/>
                </div>
                <p>
                  프로젝트에 관한 이미지를 첨부 <br/>
                  최대 100MB까지 첨부가능해요. <br/>
                  (JPG, PNG, GIF 가능)
                </p>
              </div>
            </div>

            <div>
              <h2>모임명</h2>
              <div className='inputs_layout'>
                <input type="text" placeholder='모임명을 입력해주세요'/>
              </div>

              <h2>모임 유형</h2>
              <div className='inputs_layout'>
                <SelectBox options={["프로젝트", "스터디"]}/>
                <SelectBox options={["개발", "디자인", "기획", "기타"]}/>
              </div>
            </div>
          </div>

          <h2>모임설명</h2>
          <textarea placeholder='내용을 작성해 주세요'/>

          <h2>모임 장소</h2>
          <div className='inputs_layout'>
            <SelectBox options={["온라인", "오프라인"]}/>
            <SelectBox options={["서울", "경기", "인천", "대전", "충북", "충남", "부산", "울산", "경북", "경남", "대구", "광주", "전북", "전남", "제주", "강원"]}/>
            <input type="text" placeholder="세부 주소를 입력해주세요"/>
          </div>

          <h2>모집 팀원</h2>
          <SelectBox options={["모집중", "모집완료"]}/>
          <ul className='member_selector_layout'>
            {[1, 2, 3].map(_ => (
              <SelectTeamMember/>
            ))}
          </ul>

          <div className='submit_button_layout'>
            <button type={"submit"}>저장하기</button>
            <button type={"submit"} className='cancel'>보류하기</button>
          </div>
        </div>

      </div>
    </>
  );
}

export default EditProjectInfoPage;