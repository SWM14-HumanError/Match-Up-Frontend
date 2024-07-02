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
          <FoldListComponent title='로그인 방식이 다른데, 같은 계정으로 로그인 됩니다'>
            로그인 시 이메일이 같다면 같은 계정으로 인식합니다. <br/>
            특히 카카오 로그인 시 카카오 아이디가 이메일인 경우 그 이메일 계정으로 로그인 됩니다.
          </FoldListComponent>
          <FoldListComponent title='내 프로필이 인재풀 페이지에서 보이지 않아요'>
            설정의 프로필 숨기기 기능이 켜져있어서 그렇습니다. <br/>
            설정에서 프로필 숨기기를 해제하시면 인재풀 페이지에서 볼 수 있습니다.
          </FoldListComponent>
          <FoldListComponent title='팀 수정 페이지에서 팀원을 삭제 할 수 없습니다'>
            팀원 수정은 해당 분야에 지원자 또는 팀원이 없을 때만 가능합니다. <br/>
            팀원을 수정하려면 해당 분야의 지원자와 팀원을 삭제해야 팀원 삭제를 할 수 있습니다.
          </FoldListComponent>
          <FoldListComponent title='멘토 평가는 언제 할 수 있나요?'>
            멘토링이 끝나면 멘토링에 대한 평가를 진행할 수 있습니다. <br/>
            멘토님이 멘토링을 종료하면 멘토링에 대한 평가를 진행할 수 있습니다.
          </FoldListComponent>
          <FoldListComponent title='팀매칭을 어디에서 하면되나요?'>
            로그인을 한 뒤 팀원으로 지원해도 되고, 가입된 팀이라면 팀원을 찾아 초대하기 버튼을 눌러 프로젝트에 초대할 수 있습니다.
          </FoldListComponent>
          <FoldListComponent title='1:1문의는 어디에서 하나요?'>
            페이지 하단에 있는 고객센터의 1:1문의를 눌러 문의해주시면 됩니다
          </FoldListComponent>
        </ul>
        {Array.from({length:10}).map((_,i) => (<br key={i}/>))}
      </div>

      <Footer/>
    </>
  );
}

export default FAQ;