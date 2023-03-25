import React, { useState, useCallback ,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

import Auth from './user/pages/Auth';
import logo from './logo.svg';
import './App.css';
import Home from './user/pages/Home';
import User from './user/pages/User';
import SList from './user/pages/List'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import Upload from './user/pages/Upload';
import Signup from './user/pages/Signup';
import Order from './user/pages/Order';
import Search from './user/pages/search';
import { AuthContext } from './shared/context/auth-context';
import { FrontPage } from './user/pages/FrontPage';
import DriverSignup from './user/pages/Driversign';
import DenyAppointment from './user/pages/cancelA';
import ConfirmAppointment from './user/pages/acceptA';
import Doctor from './user/pages/Doctors';
import Appointment from './user/pages/Appointment';
import Video from './user/pages/Video';
import Motivation from './user/pages/Motivation';
function App() {
    const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
const [userId, setUserId] = useState (false);

const login = useCallback ((uid, token,expirationDate)=> {
  setToken (token);
  setUserId(uid);
  const tokenExpirationDate =
  expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  setTokenExpirationDate(tokenExpirationDate);
  localStorage.setItem(
  'userData',
  JSON.stringify({
    userId: uid,
    token: token,
    expiration: tokenExpirationDate.toISOString()
  })
);
}, []);


const logout = useCallback (()=> {
  setToken (null);
  setTokenExpirationDate(null);
  setUserId(null);
  localStorage.removeItem('userData');
},[]);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  if (
    storedData &&
    storedData.token &&
    new Date(storedData.expiration) > new Date()
  ) {
    login(storedData.userId, storedData.token, new Date(storedData.expiration));
  }
}, [login]);
let routes;
if (token) {
    routes = (
        <Routes>
        <Route path="/"  element={<FrontPage />}/>
        <Route path="/login"  element={<Auth />}/>
        <Route path="/signin"  element={<Signup />}/>
        <Route path="/home"  element={<Home />}/>
        <Route path="/order"  element={<Order />}/>
        <Route path="/search"  element={<Search />}/>
        <Route path="/user"  element={<User />}/>
        <Route path="/list"  element={<SList />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/redirect" element={ <Navigate to="/home" /> } />
        <Route path="/driver" element={<DriverSignup />}/>
        <Route path="/cancel"  element={<Auth />}/>
        <Route path="/denyappointment/:userID/:docID"  element={<DenyAppointment />}/>
        <Route path="/confirmappointment/:userID/:docID"  element={<ConfirmAppointment />}/>
        <Route path="/doc" element={<Doctor />}/>
        <Route path="/appointment/:docId" element={<Appointment />}/>
        <Route path="/video/:li" element={<Video />}/>
        <Route path="/motivation" element={<Motivation />}/>


      </Routes>
    );
  }
  else{
    routes =(
        <Routes>
        <Route path="/"  element={<FrontPage />}/>
        <Route path="/login"  element={<Auth />}/>
        <Route path="/signin"  element={<Signup />}/>
        <Route path="/redirect" element={ <Navigate to="/" /> } />
        <Route path="/driver" element={<DriverSignup />}/>

      </Routes>
    );
  }
  return (
<AuthContext.Provider 
    value= {{ isLoggedIn: !!token, token: token, userId: userId,
    login : login , logout : logout}}
    >
    <Router>
        <MainNavigation />
        <main style={{minHeight: "90vh"}}>
    {routes}
    </main>
    </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
