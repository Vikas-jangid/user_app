import './App.css';
import {BrowserRouter as Router, Routes, Route} from  'react-router-dom';
import React, {useEffect} from 'react';
import Home from './Components/home';
import Login from './Components/login';
import Signup from './Components/signup';
import Error from './Components/error';
import Appbar from './Components/appbar'
import EditUser from './Components/editUser';

function App() {
  
  // useEffect(()=>{
  //   <Appbar />
  // },[]) 

  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
