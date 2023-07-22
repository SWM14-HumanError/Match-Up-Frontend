// import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/MainPage.tsx";
import MainProjectPage from './pages/MainProjectPage.tsx';
import MainStudyPage from "./pages/MainStudyPage.tsx";
import MainMenteePage from './pages/MainMenteePage.tsx';
import MainMentorPage from './pages/MainMentorPage.tsx';
import MainFeedPage from './pages/MainFeedPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
