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
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/analytics'>Analytics</Link></li>
          <li><Link to='/add'>Add</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/analytics' element={<Analytics />}></Route>
        <Route path='/add' element={<Add />}></Route>
      </Routes>
    </>
  )
}


