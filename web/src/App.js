import './App.css';
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom';
import React, {useEffect, Suspense} from 'react';
import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Signup from './Components/signup';
import Error from './Components/error';
import Appbar from './Components/appbar'
import EditUser from './Components/editUser';
import ResetPassword from './Components/resetPassword';
import ForgetPassword from './Components/forgetPassword';
import Home from './Components/home'

function App() {

  return (
    <Suspense>
      <Router fallback={null}> 
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
