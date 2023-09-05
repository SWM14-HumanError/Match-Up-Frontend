import {useRef, useState} from "react";
import Navigation from '../../components/Navigation.tsx';
import Camera from "../../components/svgs/Camera.tsx";
import {IEditProjectInfo} from "../../constant/interfaces.ts";
import {InitEditProjectInfo} from "../../constant/initData.ts";
import '../../styles/MainProjectPage.scss';
import SelectBox from "../../components/inputs/SelectBox.tsx";
import {ProjectFields} from "../../constant/selectOptions.ts";


const ProjectTypeArr = ['프로젝트', '스터디'];

function EditFeedPage() {
  const FileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [projectData, setProjectData] = useState<IEditProjectInfo>(InitEditProjectInfo);

  return (
    <div>
      <Navigation/>

      <div className='main_layout'>
        <h1>피드 수정</h1>

        <div className='team_title_layout'>
          <div>
            <h2>피드 이미지</h2>
            <div className='upload_layout'>
              <div className='upload_image' onClick={() => FileInput.current?.click()}>
                { !!selectedFile ? (
                  <img src={URL.createObjectURL(selectedFile)} alt='대표 이미지'/>
                ) : (
                  <div className='upload_demo'>
                    <Camera/>
                  </div>
                )}
                <input type='file' accept='image/*' ref={FileInput} onChange={e => {
                  setSelectedFile(!!e.target.files ? e.target.files[0] : null);
                }}/>
              </div>
              <p>
                프로젝트에 관한 이미지를 첨부 <br/>
                최대 100MB까지 첨부가능해요. <br/>
                (JPG, PNG, GIF 가능)
              </p>
            </div>
          </div>

          <div>
            <h2>제목</h2>
            <div className='inputs_layout'>
              <input type='text'
                     placeholder='제목을 입력해주세요'
                     value={projectData.info.title}
                     onChange={e =>
                       setProjectData(prev => (
                         {...prev, info: {...prev.info, title: e.target.value}}
                       ))}/>
            </div>

            <h2>피드 유형</h2>
            <div className='inputs_layout'>
              <SelectBox options={ProjectTypeArr}
                         value={ProjectTypeArr[projectData.type.teamType]}
                         onChange={value =>
                           setProjectData(prev => ({
                             ...prev, type: {...prev.type, teamType: ProjectTypeArr.indexOf(value)}
                           }))}/>

              <SelectBox options={ProjectFields}
                         value={projectData.type.detailType}
                         onChange={value =>
                           setProjectData(prev => ({
                             ...prev, type: {...prev.type, detailType: value}
                           }))}/>
            </div>
          </div>
        </div>

        <h2>설명</h2>
        <textarea placeholder='내용을 작성해 주세요'
                  value={projectData.info.description}
                  onChange={e =>
                    setProjectData(prev => ({
                      ...prev, info: {...prev.info, description: e.target.value}
                    }))}/>

        <div className='submit_button_layout'>
          <button>저장하기</button>
          <button className='cancel'>돌아가기</button>
        </div>

      </div>
    </div>
  );
}

export default EditFeedPage;