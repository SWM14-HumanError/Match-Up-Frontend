import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import MainProjectPage from './pages/MainPage/MainProjectPage.tsx';
import MainStudyPage from './pages/MainPage/MainStudyPage.tsx';
import MainMenteePage from './pages/MainPage/MainMenteePage.tsx';
import MainMentorPage from './pages/MainPage/MainMentorPage.tsx';
import MainFeedPage from './pages/MainPage/MainFeedPage.tsx';
import EditFeedPage from './pages/MainPage/EditFeedPage.tsx';
import LoginToken from './pages/LoginToken.tsx';
import LogoutToken from './pages/LogoutToken.tsx';
import SignUpTerms from './pages/Signup/SignUpTerms.tsx';
import UserAdditionalInfo from './pages/Signup/UserAdditionalInfo.tsx';
import ProjectDetailPage from './pages/ProjectPage/ProjectDetailPage.tsx';
import EditProjectInfoPage from './pages/ProjectPage/EditProjectInfoPage.tsx';
import UserDetailPage from './pages/ProfilePage/UserDetailPage.tsx';
import EditProfileInfoPage from './pages/ProfilePage/EditProfileInfoPage.tsx';
import MentorAuthPage from './pages/MentorAuthPage.tsx';
import MyGroup from './pages/Mypage/MyGroup.tsx';
import Page404 from './pages/Page404.tsx';
import GlobalUseEffect from './hooks/GlobalUseEffect.tsx';
import Announcement from './pages/DummyPages/Announcement.tsx';
import Inquiry from './pages/DummyPages/Inquiry.tsx';
import FAQ from './pages/DummyPages/FAQ.tsx';
import TermsOfInfo from './pages/DummyPages/TermsOfInfo.tsx';
import TermsOfService from './pages/DummyPages/TermsOfService.tsx';
import ProfileSetting from './pages/ProfilePage/ProfileSetting.tsx';
import MyInquiryPage from './pages/DummyPages/MyInquiryPage.tsx';
import MyLike from './pages/Mypage/MyLike.tsx';
import ChatPage from './pages/DummyPages/ChatPage.tsx';
import './App.css'

function App() {
  const PublicUrl = '/';

  return (
    <div className='App'>
      <BrowserRouter basename={PublicUrl}>
        <GlobalUseEffect/>

        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/project' element={<MainProjectPage/>}/>
          <Route path='/study' element={<MainStudyPage/>}/>
          <Route path='/mentee' element={<MainMenteePage/>}/>
          <Route path='/mentor' element={<MainMentorPage/>}/>
          <Route path='/feed' element={<MainFeedPage/>}/>

          <Route path='/create/feed' element={<EditFeedPage/>}/>
          <Route path='/update/feed/:feedId' element={<EditFeedPage/>}/>

          <Route path='/login/token' element={<LoginToken/>}/>
          <Route path='/logout/token' element={<LogoutToken/>}/>
          <Route path='/join' element={<SignUpTerms/>}/>
          <Route path='/join/additional-info' element={<UserAdditionalInfo/>}/>

          <Route path='/mypage/group' element={<MyGroup/>}/>
          <Route path='/mypage/like' element={<MyLike/>}/>
          <Route path='/mypage/inquiry' element={<MyInquiryPage/>}/>

          <Route path='/team/:teamId' element={<ProjectDetailPage/>}/>
          <Route path='/create/team' element={<EditProjectInfoPage/>}/>
          <Route path='/update/team/:teamId' element={<EditProjectInfoPage/>}/>

          <Route path='/mypage/profile' element={<UserDetailPage/>}/>
          <Route path='/profile/:userId' element={<UserDetailPage/>}/>
          <Route path='/update/profile' element={<EditProfileInfoPage/>}/>
          <Route path='/profile/settings' element={<ProfileSetting/>}/>
          
          <Route path='/auth/mentor' element={<MentorAuthPage/>}/>
          
          <Route path='/chat' element={<ChatPage/>}/>
          
          <Route path='/announcement' element={<Announcement/>}/>
          <Route path='/inquiry/personal' element={<Inquiry/>}/>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/terms/info' element={<TermsOfInfo/>}/>
          <Route path='/terms/service' element={<TermsOfService/>}/>

          <Route path='/not-found' element={<Page404/>}/>
          <Route path='*' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
