// added successfully
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected route component to restrict unauthenticated access
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;