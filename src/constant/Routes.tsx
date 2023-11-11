import MainPage from '../pages/MainPage/MainPage.tsx';
import MainProjectPage from '../pages/MainPage/MainProjectPage.tsx';
import MainStudyPage from '../pages/MainPage/MainStudyPage.tsx';
import MainMenteePage from '../pages/MainPage/MainMenteePage.tsx';
import MainMentorPage from '../pages/MainPage/MainMentorPage.tsx';
import MainFeedPage from '../pages/MainPage/MainFeedPage.tsx';
import EditFeedPage from '../pages/MainPage/EditFeedPage.tsx';
import LoginToken from '../pages/LoginToken.tsx';
import LogoutToken from '../pages/LogoutToken.tsx';
import SignUpTerms from '../pages/Signup/SignUpTerms.tsx';
import UserAdditionalInfo from '../pages/Signup/UserAdditionalInfo.tsx';
import MyGroup from '../pages/Mypage/MyGroup.tsx';
import MyLike from '../pages/Mypage/MyLike.tsx';
import MyInquiryPage from '../pages/DummyPages/MyInquiryPage.tsx';
import MyMentoring from '../pages/Mypage/MyMentoring.tsx';
import ProjectDetailPage from '../pages/ProjectPage/ProjectDetailPage.tsx';
import EditProjectInfoPage from '../pages/ProjectPage/EditProjectInfoPage.tsx';
import UserDetailPage from '../pages/ProfilePage/UserDetailPage.tsx';
import EditProfileInfoPage from '../pages/ProfilePage/EditProfileInfoPage.tsx';
import ProfileSetting from '../pages/ProfilePage/ProfileSetting.tsx';
import MentorAuthPage from '../pages/MentorAuthPage.tsx';
import EditMentoringPage from '../pages/MentoringPage/EditMentoringPage.tsx';
import ChatPage from '../pages/DummyPages/ChatPage.tsx';
import AdminPage from '../pages/AdminPage/AdminPage.tsx';
import BugReportPage from '../pages/AdminPage/BugReportPage.tsx';
import TestChattingPage from '../pages/AdminPage/TestChattingPage.tsx';
import Announcement from '../pages/DummyPages/Announcement.tsx';
import Inquiry from '../pages/DummyPages/Inquiry.tsx';
import FAQ from '../pages/DummyPages/FAQ.tsx';
import TermsOfInfo from '../pages/DummyPages/TermsOfInfo.tsx';
import TermsOfService from '../pages/DummyPages/TermsOfService.tsx';
import Page404 from '../pages/Page404.tsx';

export const MAP_ROUTE = [
  {path: '/', element: (<MainPage/>), auth: ['ALL']},
  {path: '/project', element: (<MainProjectPage/>), auth: ['ALL']},
  {path: '/study', element: (<MainStudyPage/>), auth: ['ALL']},
  {path: '/mentee', element: (<MainMenteePage/>), auth: ['ALL']},
  {path: '/mentor', element: (<MainMentorPage/>), auth: ['ALL']},
  {path: '/feed', element: (<MainFeedPage/>), auth: ['ALL']},

  {path: '/create/feed', element: (<EditFeedPage/>), auth: ['LOGIN']},
  {path: '/update/feed/:feedId', element: (<EditFeedPage/>), auth: ['LOGIN']},

  {path: '/login/token', element: (<LoginToken/>), auth: ['ALL']},
  {path: '/logout/token', element: (<LogoutToken/>), auth: ['ALL']},
  {path: '/join', element: (<SignUpTerms/>), auth: ['ALL']},
  {path: '/join/additional-info', element: (<UserAdditionalInfo/>), auth: ['ALL']},

  {path: '/mypage/group', element: (<MyGroup/>), auth: ['LOGIN']},
  {path: '/mypage/like', element: (<MyLike/>), auth: ['LOGIN']},
  {path: '/mypage/inquiry', element: (<MyInquiryPage/>), auth: ['LOGIN']},
  {path: '/mypage/mentor', element: (<MyMentoring/>), auth: ['LOGIN']},

  {path: '/team/:teamId', element: (<ProjectDetailPage/>), auth: ['ALL']},
  {path: '/create/team', element: (<EditProjectInfoPage/>), auth: ['LOGIN']},
  {path: '/update/team/:teamId', element: (<EditProjectInfoPage/>), auth: ['LOGIN']},

  {path: '/mypage/profile', element: (<UserDetailPage/>), auth: ['LOGIN']},
  {path: '/profile/:userId', element: (<UserDetailPage/>), auth: ['ALL']},
  {path: '/update/profile', element: (<EditProfileInfoPage/>), auth: ['LOGIN']},
  {path: '/profile/settings', element: (<ProfileSetting/>), auth: ['LOGIN']},

  {path: '/auth/mentor', element: (<MentorAuthPage/>), auth: ['LOGIN']},
  {path: '/create/mentoring', element: (<EditMentoringPage/>), auth: ['MENTOR', 'ADMIN']},
  {path: '/update/mentoring/:mentoringId', element: (<EditMentoringPage/>), auth: ['MENTOR', 'ADMIN']},

  {path: '/chat', element: (<ChatPage/>), auth: ['ADMIN']},

  {path: '/admin', element: (<AdminPage/>), auth: ['ADMIN']},
  {path: '/admin/bug', element: (<BugReportPage/>), auth: ['ADMIN']},
  {path: '/admin/test/chat', element: (<TestChattingPage/>), auth: ['ADMIN']},

  {path: '/announcement', element: (<Announcement/>), auth: ['ALL']},
  {path: '/inquiry/personal', element: (<Inquiry/>), auth: ['ALL']},
  {path: '/faq', element: (<FAQ/>), auth: ['ALL']},
  {path: '/terms/info', element: (<TermsOfInfo/>), auth: ['ALL']},
  {path: '/terms/service', element: (<TermsOfService/>), auth: ['ALL']},

  {path: '/not-found', element: (<Page404/>), auth: ['ALL']},
  {path: '*', element: (<Page404/>), auth: ['ALL']},
]