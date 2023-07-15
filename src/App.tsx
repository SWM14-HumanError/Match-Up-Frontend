// import { useState } from 'react'
import MainProjectPage from "./pages/MainProjectPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainProjectPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
