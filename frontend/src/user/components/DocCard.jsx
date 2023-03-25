import React,{useState,useEffect,useContext} from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import image from '../../jj.jpg';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import List from '../components/List';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
import '../../css/card.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {AuthContext} from '../../shared/context/auth-context'


const DocCard = props => {
    const history = useNavigate();

    const routeChange= () =>{ 
  
        history(`/appointment/${props.recipe.email}`);
      };
  return (

                <Card border="info" className="DoctorListCards">
                    <br />
                    <font className="DoctorIcon">
                        <i className="fas fa-user-md fa-9x"></i>
                    </font>
                    <Card.Body>
                        <Card.Title
                            style={{ fontSize: "2rem", color: "#195a65" }}
                        >
                            {props.recipe.name}
                        </Card.Title>
                        <Card.Text>
                        
                            <ul>
                            {props.recipe.email}
                                
                            </ul>
                        </Card.Text>

                        <Button variant="success" className="DoctorListButtonAppointment" onClick={routeChange}>
                        Book An Appointment
                    </Button>
                    </Card.Body>
                </Card>
            
       
    );
};

export default DocCard;