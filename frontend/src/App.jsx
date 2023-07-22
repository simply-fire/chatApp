import './app.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main';
import JoinRoom from './components/JoinRoom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/room' element={<Main />} />
          <Route path='/' element={<JoinRoom />} />

        </Routes>
      </BrowserRouter>

    </>

  );
}

