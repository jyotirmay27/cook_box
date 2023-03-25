import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import "../../css/Allergy.css";
import Accordion from 'react-bootstrap/Accordion';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import {AuthContext} from '../../shared/context/auth-context';
import { useParams } from "react-router-dom";

const ConfirmAppointment = () => {
  const auth = useContext(AuthContext);
  const history = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const docID=useParams().docID;
  const userID=useParams().userID;
  const placeSubmitHandler=async event =>{
     event.preventDefault();
     var date = document.getElementById('AF'). value;
     var time = document.getElementById('AR').value;
    console.log(date);
    try {
        await sendRequest(
            'http://localhost:5000/api/users/bookanappointment',
            'POST', 
            JSON.stringify({
              date: date,
              time:time,
               docID: docID,
               userID:userID,
            }),
     { 'Content-Type': 'application/json' }
     );
     console.log("fuckit")
     history('/');
  }catch(err){}
  };



return (
  <div className="BGGradeAllergy">
  <div className="TopMarginAllergy"></div>

  <div className="box" id="heading">
      <h1 className="Heading"> Appointment Confirmation</h1>{" "}
  </div>
  <Accordion className="container" bg-dark>
      <Form className="form-signin" onSubmit={placeSubmitHandler}>
          <Form.Group controlId="formGroupheart">
              <Form.Label className="AllergyFormTextLabel">
                  Date
              </Form.Label>
              <Form.Control
                  type="text"
                  id="AF"
                  placeholder="Date"
                  className="AllergyFormText"
              />
          </Form.Group>
          <Form.Group controlId="formGroupBP">
              <Form.Label className="AllergyFormTextLabel">
                  Time
              </Form.Label>
              <Form.Control
                  type="text"
                  id="AR"
                  className="AllergyFormText"
                  placeholder="Time"
              />
          </Form.Group>
          <br />
          <Button
              variant="primary"
              type="submit"
              className="AllergyButton"
          >
              Submit
          </Button>
      </Form>
  </Accordion>
</div>
);
};

export default ConfirmAppointment;