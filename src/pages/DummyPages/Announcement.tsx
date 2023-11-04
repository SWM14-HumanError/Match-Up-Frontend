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
            [플랫폼 런칭 공지] <br/>
            <br/>
            안녕하세요, SideMatch 플랫폼을 기다려주신 여러분께 감사의 말씀을 전합니다. <br/>
            <br/>
            우리는 팀을 만들고 함께 사이드 프로젝트를 진행하거나, 스터디를 통해 지식을 공유하고 쌓아갈 수 있는 새로운 플랫폼을 선보이게 되어 기쁩니다. <br/>
            <br/>
            SideMatch는 다양한 개발자들 간의 연결을 지원하고, 협업을 촉진하며, 능력을 향상시킬 수 있는 기회를 제공합니다. 여기에서 여러분은 관심 있는 분야나 프로젝트에 참여할 팀원을 찾거나,
            자신의 역량을 공유하며 성장할 수 있습니다. <br/>
            <br/>
            또한, 우리는 팀 별로 잘하는 개발자인 멘토를 영입하여 교육 및 멘토링 프로그램을 제공할 예정입니다. 이를 통해 더 나은 개발자로 성장할 수 있는 기회를 제공할 것입니다. <br/>
            <br/>
            SideMatch의 웹사이트를 통해, 다양한 기술 스택과 분야에 관심 있는 분들이 모여 함께 발전하고 성장할 수 있도록 도와줄 것입니다. 우리의 목표는 개발 커뮤니티를 위한 역동적인 플랫폼을
            제공하여 모두가 협력하고 배울 수 있는 환경을 조성하는 것입니다. <br/>
            <br/>
            플랫폼의 런칭은 곧 다가올 예정이니, 많은 관심 부탁드리며, 우리의 여정에 함께해 주실 여러분을 환영합니다. <br/>
            <br/>
            감사합니다. <br/>
            <br/>
            SideMatch 팀 드림.
          </FoldListComponent>
        </ul>
        {Array.from({length: 20}).map((_, i) => (<br key={i}/>))}
      </div>

      <Footer/>
    </>
  );
}

export default Announcement;