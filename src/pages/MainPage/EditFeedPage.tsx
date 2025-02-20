import ReactGA from 'react-ga4';
import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Navigation from '@components/navigation/Navigation.tsx';
import SelectBox from '@components/inputs/SelectBox.tsx';
import ImgUpload from '@components/inputs/ImgUpload.tsx';
import {IEditFeedInfo, IFeedDetail} from '@constant/interfaces.ts';
import {InitFeedInfo} from '@constant/initData.ts';
import Alert from '@constant/Alert.ts';
import Api from '@constant/Api.ts';

import '@styles/MainProjectPage.scss';


const ProjectTypeArr = ['기업 프로젝트', '개인 프로젝트'];

function EditFeedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const feedTitleRef = useRef<HTMLInputElement>(null);
  const feedContentRef = useRef<HTMLTextAreaElement>(null);

  const feedId = useParams().feedId ?? 0;
  const isNewFeed = !feedId;
  const [base64, setBase64] = useState<string | null>(null);
  const [base64FileName, setBase64FileName] = useState<string>('');
  const [feedInfo, setFeedInfo] = useState<IEditFeedInfo>(InitFeedInfo);

  // Todo: 피드 수정 페이지 API 이용해서 연결하는걸로 바꾸기
  // Todo: 예외처리 시 사용자에게 무조건 보여주기 + 예외처리 부분 보완

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const title = params.get('title');
    const content = params.get('content');
    const imageUrl = params.get('imageUrl');

    setFeedInfo(prev => ({
      ...prev,
      title: title || '',
      content: content || '',
      imageUrl: imageUrl === 'null' ? null : imageUrl,
    }));

    Api.fetch2Json(`/api/v1/feed/${feedId}`)
      .then(data => {
        if (!data) return;

        const {title, content, thumbnailUrl: imageUrl, type, projectDomain: domain} = data as IFeedDetail;
        setFeedInfo(prev => ({...prev, title, content, imageUrl, type, domain}));
      })
      .catch((e) => {
        if (!Api.goto404(navigate, e)) return;
      });
  }, [feedId, location.search]);

  function saveFeed() {
    if (!feedInfo.title) {
      feedTitleRef.current?.focus();
      return Alert.show('제목을 입력해주세요');
    }
    if (!feedInfo.content) {
      feedContentRef.current?.focus();
      return Alert.show('내용을 입력해주세요');
    }

    const RequestData: IEditFeedInfo = {...feedInfo, imageBase64: base64, imageName: base64FileName};

    (isNewFeed ?
        Api.fetch(`/api/v1/feed`, 'POST', RequestData) : // 프로젝트 생성 시
        Api.fetch(`/api/v1/feed/${feedId}`, 'PUT', RequestData) // 프로젝트 수정 시
    )
      .then(res => {
        if (res?.ok) {
          navigate('/feed', {replace: true});

          if (!feedId) // 프로젝트 생성
            ReactGA.event({category: 'project', action: 'create', label: 'Create Project'});
        }
        else {
          throw new Error(`피드를 ${feedId ? '수정' : '생성'}할 수 없습니다`);
        }
      })
      .catch(() => {
        console.error(`피드를 ${feedId ? '수정' : '생성'}할 수 없습니다`);
        Alert.show(`피드를 ${feedId ? '수정' : '생성'}할 수 없습니다`);
      });
  }

  function deleteFeed() {
    if (window.confirm('정말로 이 피드를 삭제하시겠습니까?'))
      Api.fetch(`/api/v1/feed/${feedId}`, 'DELETE')
        .then(res => {
          if (res && res.status < 300)
            navigate('/feed', {replace: true});
          else
            throw new Error('피드를 삭제할 수 없습니다');
        })
        .catch((e) => {
          console.error('피드를 삭제할 수 없습니다', e);
          Alert.show(`피드를 삭제할 수 없습니다`);
        });
  }

  return (
    <div>
      <Navigation/>

      <div className='main_layout'>
        <h1>
          {isNewFeed ? '피드 생성하기' : '피드 수정하기'}
        </h1>

        <div className='team_title_layout'>
          <div>
            <h2>피드 이미지</h2>
            <ImgUpload messageStart='피드에'
                       prevImgUrl={feedInfo.imageUrl}
                       setFileName={setBase64FileName}
                       setBase64={setBase64}/>
          </div>

          <div>
            <h2 className='essential'>제목</h2>
            <div className='inputs_layout'>
              <input type='text'
                     ref={feedTitleRef}
                     placeholder='제목을 입력해주세요'
                     maxLength={49}
                     value={feedInfo.title}
                     onChange={e =>
                       setFeedInfo(prev => ({...prev, title: e.target.value}))}/>
            </div>

            <h2>피드 유형</h2>
            <div className='inputs_layout'>
              <SelectBox options={ProjectTypeArr}
                         hasDefault={false}
                         value={ProjectTypeArr[feedInfo.type]}
                         onChange={value =>
                           setFeedInfo(prev => ({...prev, type: ProjectTypeArr.indexOf(value)}))}/>

              {/*<SelectBox options={ProjectSubFields}*/}
              {/*           hasDefault={feedInfo.domain === ProjectSubFields[0]}*/}
              {/*           value={feedInfo.domain}*/}
              {/*           onChange={value =>*/}
              {/*             setFeedInfo(prev => ({...prev, domain: value}))}/>*/}
            </div>
          </div>
        </div>

        <h2 className='essential'>설명</h2>
        <textarea placeholder='내용을 작성해 주세요'
                  ref={feedContentRef}
          // maxLength={699}
                  value={feedInfo.content}
                  onChange={e =>
                    setFeedInfo(prev => ({...prev, content: e.target.value}))}/>

        <div className='submit_button_layout'>
          <button onClick={saveFeed}>
            {isNewFeed ? '생성하기' : '수정하기'}
          </button>

          <button className='cancel'
                  onClick={() => navigate(isNewFeed ? '/feed' : `/feed/${feedId}`, {replace: true})}>
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