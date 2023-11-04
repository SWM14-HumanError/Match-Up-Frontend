import Navigation from '../../components/navigation/Navigation.tsx';
import FoldListComponent from '../../components/FoldListComponent.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';
import '../../styles/FoldListPage.scss';

function Announcement() {
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>공지사항</h1>
        <ul className='fold_list_layout'>
          <FoldListComponent title='SideMatch에 오신걸 환영합니다'>
            공지사항 메세지 입니다.
          </FoldListComponent>
        </ul>
        {Array.from({length: 20}).map(() => (<br/>))}
      </div>

      <Footer/>
    </>
  );
}

export default Announcement;