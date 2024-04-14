import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home';
import { Analytics } from './pages/analytics';
import { Add } from './pages/add_data';

export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to='/journey/'>Home</Link></li>
          <li><Link to='/journey/analytics'>Analytics</Link></li>
          <li><Link to='/journey/add'>Add</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/journey/' element={<Home />}></Route>
        <Route path='/journey/analytics' element={<Analytics />}></Route>
        <Route path='/journey/add' element={<Add />}></Route>
      </Routes>
    </>
  )
}


