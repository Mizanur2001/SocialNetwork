import './App.css';
// eslint-disable-next-line
import Home from './Pages/Home/Home';
// eslint-disable-next-line
import Profile from './Pages/Profile/Profile';
// eslint-disable-next-line
import Auth from './Pages/Auth/Auth'

function App() {
  return (
    <div className="App">
      <div className='blur' style={{ top: '-18%', right: '0' }}></div>
      <div className='blur' style={{ top: '36%', left: '-8rem' }}></div>
      {/* <Home/> */}
      <Profile />
      {/* <Auth /> */}
    </div>
  );
}

export default App;
