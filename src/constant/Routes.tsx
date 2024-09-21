import MainPage from '@pages/MainPage/MainPage.tsx';
import MainProjectPage from '@pages/MainPage/MainProjectPage.tsx';
import MainStudyPage from '@pages/MainPage/MainStudyPage.tsx';
import MainMenteePage from '@pages/MainPage/MainMenteePage.tsx';
import MainMentorPage from '@pages/MainPage/MainMentorPage.tsx';
import MainFeedPage from '@pages/MainPage/MainFeedPage.tsx';
import MainJobPostingPage from '@pages/MainPage/MainJobPostingPage.tsx';
import EditFeedPage from '@pages/MainPage/EditFeedPage.tsx';
import JobDetailPage from '@pages/JobPosting/JobDetailPage.tsx';
import JobPostingEditPage from '@pages/JobPosting/JobPostingEditPage.tsx';
import LoginToken from '@pages/LoginToken.tsx';
import LogoutToken from '@pages/LogoutToken.tsx';
import SignUpTerms from '@pages/Signup/SignUpTerms.tsx';
import UserAdditionalInfo from '@pages/Signup/UserAdditionalInfo.tsx';
import MyGroup from '@pages/Mypage/MyGroup.tsx';
import MyLike from '@pages/Mypage/MyLike.tsx';
import MyInquiryPage from '@pages/DummyPages/MyInquiryPage.tsx';
import MyMentoring from '@pages/Mypage/MyMentoring.tsx';
import ProjectDetailPage from '@pages/ProjectPage/ProjectDetailPage.tsx';
import EditProjectInfoPage from '@pages/ProjectPage/EditProjectInfoPage.tsx';
import UserDetailPage from '@pages/ProfilePage/UserDetailPage.tsx';
import EditProfileInfoPage from '@pages/ProfilePage/EditProfileInfoPage.tsx';
import ProfileSetting from '@pages/ProfilePage/ProfileSetting.tsx';
import MentorAuthPage from '@pages/MentorAuthPage.tsx';
import CompanyAuthPage from '@pages/CompanyAuthPage.tsx';
import EditMentoringPage from '@pages/MentoringPage/EditMentoringPage.tsx';
import ChatPage from '@pages/DummyPages/ChatPage.tsx';
import AdminPage from '@pages/AdminPage/AdminPage.tsx';
import MentorVerifyPage from '@pages/AdminPage/MentorVerifyPage.tsx';
import BugReportPage from '@pages/AdminPage/BugReportPage.tsx';
import CreateStackImagePage from '@pages/AdminPage/CreateStackImagePage.tsx';
import TestChattingPage from '@pages/AdminPage/TestChattingPage.tsx';
import Announcement from '@pages/DummyPages/Announcement.tsx';
import Inquiry from '@pages/DummyPages/Inquiry.tsx';
import FAQ from '@pages/DummyPages/FAQ.tsx';
import TermsOfInfo from '@pages/DummyPages/TermsOfInfo.tsx';
import TermsOfService from '@pages/DummyPages/TermsOfService.tsx';
import Page404 from '@pages/Page404.tsx';

export const MAP_ROUTE = [
  {path: '/', title: '사이드 프로젝트 매칭 플랫폼', element: (<MainPage/>), auth: ['ALL']},
  {path: '/project', title: '기업 프로젝트', element: (<MainProjectPage/>), auth: ['ALL']},
  {path: '/study', title: '개인 프로젝트', element: (<MainStudyPage/>), auth: ['ALL']},
  {path: '/mentee', title: '인재풀', element: (<MainMenteePage/>), auth: ['ALL']},
  {path: '/mentor', title: '멘토', element: (<MainMentorPage/>), auth: ['ALL']},
  {path: '/feed', title: '피드', element: (<MainFeedPage/>), auth: ['ALL']},
  {path: '/jobs', title: '채용공고', element: (<MainJobPostingPage/>), auth: ['ALL']},

  {path: '/create/feed', title: '피드 만들기', element: (<EditFeedPage/>), auth: ['LOGIN']},
  {path: '/update/feed/:feedId', title: '피드 수정', element: (<EditFeedPage/>), auth: ['LOGIN']},

  {path: '/job/:id', title: '채용공고 상세', element: (<JobDetailPage/>), auth: ['ALL']},
  {path: '/create/job', title: '채용공고 만들기', element: (<JobPostingEditPage/>), auth: ['ADMIN']},

  {path: '/login/token', title: '로그인', element: (<LoginToken/>), auth: ['ALL']},
  {path: '/logout/token', title: '로그아웃', element: (<LogoutToken/>), auth: ['ALL']},
  {path: '/join', title: '회원가입', element: (<SignUpTerms/>), auth: ['ALL']},
  {path: '/join/additional-info', title: '회원가입 정보', element: (<UserAdditionalInfo/>), auth: ['ALL']},

  {path: '/mypage/group', title: '내 프로젝트', element: (<MyGroup/>), auth: ['LOGIN']},
  {path: '/mypage/like', title: '내가 누른 좋아요', element: (<MyLike/>), auth: ['LOGIN']},
  {path: '/mypage/inquiry', title: '나의 문의', element: (<MyInquiryPage/>), auth: ['LOGIN']},
  {path: '/mypage/mentor', title: '멘토링 관리', element: (<MyMentoring/>), auth: ['LOGIN']},

  {path: '/team/:teamId', title: '프로젝트 상세', element: (<ProjectDetailPage/>), auth: ['ALL']},
  {path: '/create/team', title: '프로젝트 만들기', element: (<EditProjectInfoPage/>), auth: ['LOGIN']},
  {path: '/update/team/:teamId', title: '프로젝트 수정', element: (<EditProjectInfoPage/>), auth: ['LOGIN']},

  {path: '/mypage/profile', title: '내 프로필', element: (<UserDetailPage/>), auth: ['LOGIN']},
  {path: '/profile/:userId', title: '인재 프로필', element: (<UserDetailPage/>), auth: ['ALL']},
  {path: '/update/profile', title: '프로필 수정', element: (<EditProfileInfoPage/>), auth: ['LOGIN']},
  {path: '/profile/settings', title: '프로필 설정', element: (<ProfileSetting/>), auth: ['LOGIN']},

  {path: '/auth/mentor', title: '멘토 인증', element: (<MentorAuthPage/>), auth: ['LOGIN']},
  {path: '/auth/enterprise', title: '기업 인증', element: (<CompanyAuthPage/>), auth: ['LOGIN']},
  {path: '/create/mentoring', title: '멘토링 만들기', element: (<EditMentoringPage/>), auth: ['MENTOR', 'ADMIN']},
  {path: '/update/mentoring/:mentoringId', title: '멘토링 수정', element: (<EditMentoringPage/>), auth: ['MENTOR', 'ADMIN']},

  {path: '/chat', title: '채팅', element: (<ChatPage/>), auth: ['LOGIN']},

  {path: '/admin', title: '기업 관리', element: (<AdminPage/>), auth: ['ADMIN']},
  {path: '/admin/auth/mentor', title: '멘토 관리', element: (<MentorVerifyPage/>), auth: ['ADMIN']},
  {path: '/admin/bug', title: '버그 제보', element: (<BugReportPage/>), auth: ['ADMIN']},
  {path: '/admin/test/stack', title: '스택', element: (<CreateStackImagePage/>), auth: ['ADMIN']},
  {path: '/admin/test/chat', title: '채팅', element: (<TestChattingPage/>), auth: ['ADMIN']},

  {path: '/announcement', title: '공지사항', element: (<Announcement/>), auth: ['ALL']},
  {path: '/inquiry/personal', title: '버그 신고 및 제안', element: (<Inquiry/>), auth: ['ALL']},
  {path: '/faq', title: '자주 묻는 질문', element: (<FAQ/>), auth: ['ALL']},
  {path: '/terms/info', title: '개인정보이용약관', element: (<TermsOfInfo/>), auth: ['ALL']},
  {path: '/terms/service', title: '서비스 이용약관', element: (<TermsOfService/>), auth: ['ALL']},

  {path: '/not-found', title: '찾을 수 없는 페이지', element: (<Page404/>), auth: ['ALL']},
  {path: '*', title: '찾을 수 없는 페이지', element: (<Page404/>), auth: ['ALL']},
]
