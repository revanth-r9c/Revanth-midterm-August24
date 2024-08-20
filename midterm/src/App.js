// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import LoginPage from './components/LoginPage';
// import RegisterPage from './components/RegisterPage';
// import MembersPage from './components/MembersPage';
// import HomePage from './components/HomePage';
// import { useSelector } from 'react-redux';
// import AdminPage from './components/AdminPage';
// import "./App.css";

// const App = () => {
//   const { user } = useSelector(state => state.auth);

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/members" element={user ? <MembersPage /> : <Navigate to="/login" />} />
//         <Route path="/" element={<HomePage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MembersPage from './components/MembersPage';
import HomePage from './components/HomePage';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import robo from './robo.png';
import "./App.css";

const AdminPage = lazy(() => import('./components/AdminPage'));

const App = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Router>
      <Navbar />
      <img src={robo}/>
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/members" element={user ? <MembersPage /> : <Navigate to="/login" />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
