import {useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Navigation from '../../components/Navigation.tsx';
import SelectBox from '../../components/inputs/SelectBox.tsx';
import Camera from '../../components/svgs/Camera.tsx';
import {IEditFeedInfo} from '../../constant/interfaces.ts';
import {InitFeedInfo} from '../../constant/initData.ts';
import {ProjectFields} from '../../constant/selectOptions.ts';
import Api from '../../constant/Api.ts';
import '../../styles/MainProjectPage.scss';


const ProjectTypeArr = ['프로젝트', '스터디'];

function EditFeedPage() {
  const navigate = useNavigate();
  const feedId = useParams().feedId;
  const FileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [feedInfo, setFeedInfo] = useState<IEditFeedInfo>(InitFeedInfo);

  function saveFeed() {
    ( !!feedId ? // 프로젝트 수정 시
        Api.fetch(`/api/v1/feed/${feedId}`,  'PUT', feedInfo) : // 프로젝트 생성 시
        Api.fetch(`/api/v1/feed`, 'POST', feedInfo)
    )
      .then(() => navigate(-1))
      .catch(() => alert(`피드를 ${feedId ? '수정' : '생성'}할 수 없습니다`));
  }
  function deleteFeed() {
    if (window.confirm('정말로 이 피드를 삭제하시겠습니까?'))
      Api.fetch(`/api/v1/feed/${feedId}`, 'DELETE')
        .then(() => navigate(-1))
        .catch(() => alert('피드를 삭제할 수 없습니다'));
  }

  return (
    <div>
      <Navigation/>

      <div className='main_layout'>
        <h1>
          {feedId ? '피드 수정하기' : '피드 생성하기'}
        </h1>

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
                     value={feedInfo.title}
                     onChange={e =>
                       setFeedInfo(prev => ({...prev, title: e.target.value}))}/>
            </div>

            <h2>피드 유형</h2>
            <div className='inputs_layout'>
              <SelectBox options={ProjectTypeArr}
                         value={ProjectTypeArr[feedInfo.type]}
                         onChange={value =>
                           setFeedInfo(prev => ({...prev, type: ProjectTypeArr.indexOf(value)}))}/>

              <SelectBox options={ProjectFields}
                         value={feedInfo.domain}
                         onChange={value =>
                           setFeedInfo(prev => ({...prev, domain: value}))}/>
            </div>
          </div>
        </div>

        <h2>설명</h2>
        <textarea placeholder='내용을 작성해 주세요'
                  value={feedInfo.content}
                  onChange={e =>
                    setFeedInfo(prev => ({...prev, content: e.target.value}))}/>

        <div className='submit_button_layout'>
          <button onClick={saveFeed}>
            {feedId ? '수정하기' : '생성하기'}
          </button>

          <button className='cancel'
                  onClick={() => navigate(-1)}>
            돌아가기
          </button>

          {feedId &&
            <button className='danger'
                    onClick={deleteFeed}>
              삭제하기
            </button>
          }
        </div>

      </div>
    </div>
  );
}

export default EditFeedPage;