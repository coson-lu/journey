import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import './nav.css'

function App() {
  return (
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
  );
}

export default App;
