import {useEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import MainProjectPage from './pages/MainPage/MainProjectPage.tsx';
import MainStudyPage from './pages/MainPage/MainStudyPage.tsx';
import MainMenteePage from './pages/MainPage/MainMenteePage.tsx';
import MainMentorPage from './pages/MainPage/MainMentorPage.tsx';
import MainFeedPage from './pages/MainPage/MainFeedPage.tsx';
import LoginToken from './pages/LoginToken.tsx';
import ProjectDetailPage from './pages/ProjectPage/ProjectDetailPage.tsx';
import EditProjectInfoPage from './pages/ProjectPage/EditProjectInfoPage.tsx';
import MyGroup from './pages/Mypage/MyGroup.tsx';
import Page404 from './pages/Page404.tsx';
import './App.css'

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollToTop/>

        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/project' element={<MainProjectPage/>}/>
          <Route path='/study' element={<MainStudyPage/>}/>
          <Route path='/mentee' element={<MainMenteePage/>}/>
          <Route path='/mentor' element={<MainMentorPage/>}/>
          <Route path='/feed' element={<MainFeedPage/>}/>

          <Route path='/login/token' element={<LoginToken/>}/>

          <Route path='/mypage/group' element={<MyGroup/>}/>

          <Route path='/project/:projectId' element={<ProjectDetailPage/>}/>
          <Route path='/create/project' element={<EditProjectInfoPage/>}/>
          <Route path='/update/project/:projectId' element={<EditProjectInfoPage/>}/>

          <Route path='*' element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
