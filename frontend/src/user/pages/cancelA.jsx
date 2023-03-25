import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import "../../css/Allergy.css";
import Accordion from 'react-bootstrap/Accordion';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import {AuthContext} from '../../shared/context/auth-context';
import { useParams } from "react-router-dom";

const DenyAppointment = () => {
  //const auth = useContext(AuthContext);
  const history = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const docID=useParams().docID;
  const userID=useParams().userID;
  const cancellation= async (props) =>{
     

    try {
        await sendRequest(
            'http://localhost:5000/api/users/cancelanappointment',
            'POST', 
            JSON.stringify({
              
               docID: docID,
               userID:userID,
            }),
     { 'Content-Type': 'application/json' }
     );
     history('/');
  }catch(err){}
  };
  const denycancellation= props=>{
    history('/');

  };



return (
  <div className="BGGradeAllergy">
  <div className="TopMarginAllergy"></div>

  <div className="box" id="heading">
      <h1 className="Heading"> Appointment Decilination</h1>{" "}
  </div>
  <Accordion className="container" bg-dark>
  <h2 className="Heading"> Are You Sure</h2>{" "}
  <Button 
  variant="danger"
  className="DoctorListButtonDoctor"
  onClick={cancellation}>
      YES
      </Button>{" "} 
  <Button
  variant="success"
  className="DoctorListButtonDoctor"
  onClick={denycancellation}>
      NO
    </Button>
  </Accordion>
</div>
);
};

export default DenyAppointment;