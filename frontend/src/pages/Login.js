import '../nav.css';
import './login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";


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

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User logged in:", user);
      navigate('/');
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  let x = (value, istart, istop, ostart, ostop) => ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
  
  return (
    <>
      <div className='password-container'>
        <form onSubmit={(e) => { e.preventDefault(); googleLogin(); }}>
          <h1 id='title'>Journey</h1>
          <p id='hook'>Capture your journey, one day at a time</p>
          <input id='password-submit' type='submit' value='Get Started'/>
        </form>
      </div>
      <div className='big-password-container'>
        {Array.from({ length: (1800 - 450) }, (_, index) => {
          const i = 1800 - index;
          return (
            <div key={i} style={{
              width: i + 'px',
              height: i + 'px',
              transform: 'rotate(45deg) ',
              backgroundColor: `rgb(
                ${x(i, 450, 1800, 27, 18)},
                ${x(i, 450, 1800, 27, 18)},
                ${x(i, 450, 1800, 50, 18)}
              )`,
              position: 'absolute',
              top: `calc(50% - (${i / 2}px))`,
              left: `calc(50% - (${i / 2}px))`,
              'borderRadius': `${x(i, 450, 1800, 80, 300)}px`,
              'zIndex': -50000}}>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Login;
