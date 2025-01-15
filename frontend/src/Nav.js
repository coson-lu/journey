import './nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhsYTsARbktH1dFmGcBAMWuxMs1Zl18SM",
  authDomain: "journey-e0a4d.firebaseapp.com",
  projectId: "journey-e0a4d",
  storageBucket: "journey-e0a4d.firebasestorage.app",
  messagingSenderId: "912682607156",
  appId: "1:912682607156:web:b50e7fdeafe1a24cb2a061",
  measurementId: "G-6180PNBDWL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Nav() {
  const navigate = useNavigate();
  const auth = getAuth();
  
  const googleLogout = async () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error during sign-in:", error);
    });
  }

  return (
    <>
      <nav>
        <div class="spacer"></div>
        <div className='center-group'>
          <Link to='/' class='nav-item'>Home</Link>
          <Link to='/analytics' class='nav-item'>Analytics</Link>
        </div>
        <div className='right-group'>
          <a class='nav-item' id='logout-button' onClick={(e) => { e.preventDefault(); googleLogout(); }}>Logout</a>
        </div>
      </nav>
    </>
  );
}

export default Nav;
