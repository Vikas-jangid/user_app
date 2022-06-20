import './App.css';
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom';
import React, {useEffect} from 'react';
import Dashboard from './Components/dashboard';
import Login from './Components/login';
import Signup from './Components/signup';
import Error from './Components/error';
import Appbar from './Components/appbar'
import EditUser from './Components/editUser';
import ResetPassword from './Components/resetPassword';
import ForgetPassword from './Components/forgetPassword';
import Home from './Components/home'
import i18n from './Components/i18n';
import { Suspense } from 'react';
import Loading from './Components/loading.js'

function App() {

  return (
    <Router>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
