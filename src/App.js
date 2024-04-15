import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/nav.css';
import './css/general.css';
import { Analytics } from './pages/analytics';
import { Add } from './pages/add_data';

export default function App() {
  return (
    <>
      <nav>
        <div><Link class='nav-item' to='/journey/'>Add Data</Link></div>
        <div><Link class='nav-item' to='/journey/analytics'>Analytics</Link></div>
      </nav>
      
      <div class='content'>
        <Routes>
          <Route path='/journey/' element={<Add />}></Route>
          <Route path='/journey/analytics' element={<Analytics />}></Route>
        </Routes>
      </div>
    </>
  )
}


