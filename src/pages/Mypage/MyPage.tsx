import Navigation from '@components/navigation/Navigation.tsx';
import DetailToggleBox from '@components/DetailToggleBox.tsx';
import '@styles/MainProjectPage.scss';
import '@styles/pages/ProjectDetailPage.scss';

/* 들어가야 할 목록
내 모임 (최근)
내 프로필 ()
채팅 (최근)
구매 내역 (최근)
* */
function MyPage() {
  return (
    <div>
      <Navigation/>

      <div className='main_layout project_detail_page'>
        <h1>마이페이지</h1>

        <DetailToggleBox title='내 프로젝트'>
          <div className='contents_border'>
            <p>
              내 프로젝트
            </p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='내 프로필'>
          <div className='contents_border'>
            <p>
              내 프로필
            </p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='최근 채팅'>
          <div className='contents_border'>
            <p>
              채팅
            </p>
          </div>
        </DetailToggleBox>

        <DetailToggleBox title='구매 내역'>
          <div className='contents_border'>
            <p>
              구매 내역
            </p>
          </div>
        </DetailToggleBox>

      </div>
    </div>
  );
}

export default MyPage;