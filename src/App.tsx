import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GlobalUseEffect from './hooks/GlobalUseEffect.tsx';
import {MAP_ROUTE} from './constant/Routes.tsx';
import './App.css'

function App() {
  const PublicUrl = '/';

  return (
    <div className='App'>
      <BrowserRouter basename={PublicUrl}>
        <GlobalUseEffect/>

        <Routes>
          {MAP_ROUTE.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}/>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
