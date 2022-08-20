import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Auth from './Pages/Auth/Auth'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'
import Verify from './Pages/Auth/Verify';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    setIsAuth(window.location.href.includes('/Auth'))
  }, [])
  return (
    <Router>
      <div className="App">
        <div className='blur' style={{ top: '-18%', right: '0' }}></div>
        <div className='blur' style={{ top: '36%', left: '-8rem' }}></div>
        <Routes>
          <Route path='/' element={localStorage.getItem('authToken') ? <Home /> : <Navigate to='/Auth' />} />
          <Route path='/profile' element={localStorage.getItem('authToken') ? <Profile /> : <Navigate to='/Auth' />} />
          <Route path='/Auth' element={localStorage.getItem('authToken') ? <Navigate to='/' /> : <Auth />} />
          <Route path='/Auth/verify' element={localStorage.getItem('authToken') ? <Navigate to='/' /> : <Verify />} />
        </Routes>
      </div>
      {!isAuth && <div className="navbar">
        <Link to='/profile'>
          <span className="material-symbols-outlined navigationIcons">
            supervised_user_circle
          </span>
        </Link>
        <Link to='/'>
          <span className="material-symbols-outlined navigationIcons">
            house
          </span>
        </Link>
        <Link to='/'>
          <span className="material-symbols-outlined navigationIcons" >
            group
          </span>
        </Link>
      </div>}
    </Router>

  );
}

export default App;
