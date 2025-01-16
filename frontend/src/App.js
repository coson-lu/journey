import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Nav from "./Nav";
import './nav.css';
import './App.css';
import Loading from './Loading';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <Loading></Loading>
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Nav />
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <Nav />
            <Analytics />
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
