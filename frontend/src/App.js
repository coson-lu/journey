import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import './nav.css'
import './App.css'
import { useState } from 'react';

function App() {
  let [password, setPassword] = useState('')
  let [access, setAccess] = useState(false)
  let handleSubmit = () => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setAccess(true)
      localStorage.setItem('signedIn', process.env.REACT_APP_PASSWORD)
    }
  }
  let x = (value, istart, istop, ostart, ostop) => ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
  
  return (
    <>
      {access === true || localStorage.getItem('signedIn') == process.env.REACT_APP_PASSWORD ? (
        <>
          <nav>
            <Link to='/' class='nav-item'>Home</Link>
            <Link to='/analytics' class='nav-item'>Analytics</Link>
          </nav>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route/>
          </Routes>
        </>
      ) : (
        <>
          <div class='password-container'>
            <form onSubmit={handleSubmit}>
              <h1 id='password-prompt'>Enter password for website access: </h1>
              <input id='password-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <input id='password-submit' type='submit' placeholder='submit'/>
            </form>
          </div>
          <div class='big-password-container'>
            {Array.from({ length: (1800 - 450) }, (_, index) => {
              const i = 1800 - index;
              return (
                <div key={i} style={{ width: i + 'px', height: i + 'px', transform: 'rotate(45deg) ', backgroundColor: `rgb(${x(i, 450, 1800, 27, 18)}, ${x(i, 450, 1800, 27, 18)}, ${x(i, 450, 1800, 50, 18)})`, position: 'absolute', top: `calc(50% - (${i / 2}px))`, left: `calc(50% - (${i / 2}px))`, 'borderRadius': `${x(i, 450, 1800, 80, 300)}px`, 'zIndex': -50000}}>
                </div>
              );
            })}
          </div>
        </>
      )}
      
    </>
  );
}

export default App;
