
import React, { useState,useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { AuthContext} from '../../context/auth-context';
import {NavLink , Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';
import "./MainNav.css";
const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
   const history = useNavigate();
  const routeChange2= () =>{ 
  
    history('/search');
  };
  const routeChange = () =>{ 
    //let path = `/login`; 
    history('login');
  }
    return(
      <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
        
        <ul className="nav-links">
          
                        <li>
    {auth.isLoggedIn  &&( <NavLink className="NavbarLinks" to="/upload">
                            <i class="fas fa-heartbeat"></i>
                            
                            Upload
                        </NavLink>)}
                        </li>
                        <li>
    {auth.isLoggedIn  &&(<NavLink className="NavbarLinks" to="/home">
                            <i class="fas fa-user-md"></i>
                            
                            Home
                        </NavLink>)}
                        </li>
                        <li>
    {auth.isLoggedIn  &&(<NavLink className="NavbarLinks" to="/search">
                            <i class="fas fa-bacteria"></i>
                            {"   "}
                            Search
                        </NavLink>)}
                        </li>
                        
      {auth.isLoggedIn  && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
       
       {!auth.isLoggedIn && (
        <li>
          <button onClick={routeChange}>LOGIN</button>
        </li>
      )}
    </ul>

  
        </nav>
      </SideDrawer>
        <Navbar sticky="top" bg="dark" variant="dark" className="BGGrade">
  <Navbar.Brand className="MediTechLogo" href="/home">CookBox</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto"></Nav>
    <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
    <Nav className="main-navigation__header-nav">
  
    {auth.isLoggedIn &&( <Link className="NavbarLinks" to="/upload">
                            <i class="fas fa-heartbeat"></i>
                            {"   "}
                            Upload
                        </Link>)}
    {auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/home">
                            <i class="fas fa-user-md"></i>
                            {"   "}
                            Home
                        </NavLink>)}
                        {auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/doc">
                            <i class="fas fa-user-md"></i>
                            {"   "}
                            Counsellor
                        </NavLink>)}
                        {auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/motivation">
                            <i class="fas fa-user-md"></i>
                            {"   "}
                            Movtivation
                        </NavLink>)}
    {auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/search">
                            <i class="fas fa-bacteria"></i>
                            {"   "}
                            
                            Search
                        </NavLink>)}
                        {auth.isLoggedIn  &&(<Button  onClick={auth.logout} variant="warning">Logout</Button>)}
    {!auth.isLoggedIn  &&(<Button onClick={routeChange}  variant="warning">Login</Button>)}
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
</React.Fragment>
    );

};
 
export default MainNavigation;
