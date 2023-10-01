import Navigation from '../../components/navigation/Navigation.tsx';
import FoldListComponent from '../../components/FoldListComponent.tsx';
import Footer from '../../components/Footer.tsx';

import '../../styles/MainProjectPage.scss';
import '../../styles/FoldListPage.scss';

function FAQ() {
  return (
    <>
      <Navigation/>
      <div className='main_layout'>
        <h1>FAQ</h1>
        <ul className='fold_list_layout'>
          <FoldListComponent title='팀매칭을 어디에서 하면되나요?'>
            로그인을 한 뒤 팀원으로 지원해도 되고, 가입된 팀이라면 팀원을 찾아 초대하기 버튼을 눌러 프로젝트/스터디에 초대할 수 있습니다.
          </FoldListComponent>
          <FoldListComponent title='1:1문의는 어디에서 하나요?'>
            페이지 하단에 있는 고객센터의 1:1문의를 눌러 문의해주시면 됩니다
          </FoldListComponent>
        </ul>
        {Array.from({length: 40}).map(() => (<br/>))}
      </div>

      <Footer/>
    </>
  );
}

export default FAQ;