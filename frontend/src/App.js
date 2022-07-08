import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Auth from './Pages/Auth/Auth'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Verify from './Pages/Auth/Verify';

function App() {
  return (
    <div className="App">
      <div className='blur' style={{ top: '-18%', right: '0' }}></div>
      <div className='blur' style={{ top: '36%', left: '-8rem' }}></div>
      <Router>
        <Routes>
          <Route path='/' element={localStorage.getItem('authToken') ? <Home /> : <Navigate to='/Auth' />} />
          <Route path='/profile' element={localStorage.getItem('authToken') ? <Profile /> : <Navigate to='/Auth' />} />
          <Route path='/Auth' element={localStorage.getItem('authToken') ? <Navigate to='/' /> : <Auth />} />
          <Route path='/Auth/verify' element={localStorage.getItem('authToken') ? <Navigate to='/' /> : <Verify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
