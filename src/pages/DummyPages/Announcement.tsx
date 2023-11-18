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
          <FoldListComponent title='새로운 기능 도착! 채팅으로 더 가까이 소통하세요! 🚀'>
            안녕하세요, SideMatch 사용자 여러분!<br/>
            <br/>
            저희 SideMatch에 새로운 기능이 추가되었습니다! 이제부터 프로젝트나 스터디에 참여한 다른 멤버들과 손쉽게 소통할 수 있는 <b>채팅 기능</b>이 도입되었습니다.<br/>

            <h3>어떻게 사용하나요?</h3>
            프로필 페이지에서 '채팅하기' 버튼을 클릭하여 상대방과 간편하게 대화를 시작하세요. 새로운 아이디어를 나누거나 프로젝트 진행에 필요한 정보를 공유하세요.<br/>
            <br/>
            <h3>주요 기능 및 장점:</h3>
            <ol>
              <li><b>실시간 채팅:</b> 바로바로 응답하고 더 빠르게 소통하세요.<br/></li>
              <li><b>프로필 페이지에서 바로 채팅 가능:</b> 사용자 프로필 페이지에서 채팅 버튼을 통해 편리하게 소통 시작하세요.<br/></li>
              <li><b>프로젝트/스터디 관련 대화:</b> 프로젝트나 스터디에 관한 대화를 효율적으로 관리하세요.<br/></li>
            </ol>
            이제 더 나은 협업과 소통을 위해 SideMatch의 채팅 기능을 활용해 보세요! 궁금한 사항이나 문제가 발생하면 언제든지 문의해주세요. 새로운 기능이 여러분에게 즐거움과 혜택을 가져다줄
            것이라고 기대합니다.<br/>
            <br/>
            더 많은 편의성과 기능이 추가될 예정이니, 계속해서 SideMatch을 이용해 주셔서 감사합니다. 함께 더 나은 협업을 경험해봐요!<br/>
            <br/>
            감사합니다.<br/>
            <br/>
            SideMatch 팀 드림<br/>
          </FoldListComponent>
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