import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/MainPage/MainPage.tsx";
import MainProjectPage from './pages/MainPage/MainProjectPage.tsx';
import MainStudyPage from "./pages/MainPage/MainStudyPage.tsx";
import MainMenteePage from './pages/MainPage/MainMenteePage.tsx';
import MainMentorPage from './pages/MainPage/MainMentorPage.tsx';
import MainFeedPage from './pages/MainPage/MainFeedPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProjectDetailPage from "./pages/ProjectPage/ProjectDetailPage.tsx";
import EditProjectInfoPage from "./pages/ProjectPage/EditProjectInfoPage.tsx";
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/project' element={<MainProjectPage/>}/>
          <Route path='/study' element={<MainStudyPage/>}/>
          <Route path='/mentee' element={<MainMenteePage/>}/>
          <Route path='/mentor' element={<MainMentorPage/>}/>
          <Route path='/feed' element={<MainFeedPage/>}/>

          <Route path='/login' element={<LoginPage/>}/>

          <Route path='/project/:projectId' element={<ProjectDetailPage/>}/>
          <Route path='/create/project' element={<EditProjectInfoPage/>}/>
          <Route path='/update/project/:projectId' element={<EditProjectInfoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
