import React, { useState,useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink , Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import Backdrop from '../UI/Backdrop';
import './MainNav.css';
import { useNavigate } from "react-router-dom";
import { useHttpClient } from '../../hooks/useHttpClient';
import {AuthContext} from '../../context/auth-context'
const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);


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
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
        
        <ul className="nav-links">
          
                        <li>
 {auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/home">
                            Add Vitals
                        </NavLink>)}
                        </li>
                        <li>
{auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/user">
                            
                           user
                        </NavLink>)}
                        </li>
                        <li>
{auth.isLoggedIn &&( <NavLink className="NavbarLinks" to="/auth">
                            {"   "}
                            auth
                        </NavLink>)}
                        </li>
                       
        <li>
          <button onClick={routeChange}>LOGIN</button>
        </li>

    </ul>

  
        </nav>
      </SideDrawer>
        <Navbar sticky="top" bg="dark" variant="dark" className="BGGrade">
  <Navbar.Brand className="MediTechLogo" href="/home">FeedMe</Navbar.Brand>
  
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
        
            <Button variant="outline-success" onClick={routeChange2}>Search</Button>
          
    <Nav className="main-navigation__header-nav">
    
{auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/home">
                            <i class="fas fa-prescription"> </i>
                            {"   "}
                            Home
                        </NavLink>)}
{auth.isLoggedIn &&(<Link className="NavbarLinks" to="/user">
                            <i class="fas fa-heartbeat"></i>
                            {"   "}
                            User
                        </Link>)}
{auth.isLoggedIn &&(<NavLink className="NavbarLinks" to="/auth">
                            <i class="fas fa-user-md"></i>
                            {"   "}
                            Auth
                        </NavLink>)}
{!auth.isLoggedIn &&(<Button onClick={routeChange}  variant="warning">Login</Button>)}
{auth.isLoggedIn &&(<Button onClick={auth.logout}  variant="warning">Logout</Button>)}

    </Nav>
    
  </Navbar.Collapse>
</Navbar>
</React.Fragment>
    );

};

export default MainNavigation;
