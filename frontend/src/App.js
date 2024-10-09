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
    }
  }

  return (
    <>
      {access === true ? (
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
        <div class='password-container'>
          <form onSubmit={handleSubmit}>
            <h1>Enter password for website access: </h1>
            <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br></br>
            <input type='submit' placeholder='submit'/>
          </form>
        </div>
        
      )}
      
    </>
  );
}

export default App;
