import './App.css';
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom';
import React, {useEffect, useState} from 'react';
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
import LocaleContext from './Components/localeContext.js'

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', (lng) => setLocale(i18n.language));
  return (
    <LocaleContext.Provider value={{locale, setLocale}}>
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
    </LocaleContext.Provider>
  );
}

export default App;
