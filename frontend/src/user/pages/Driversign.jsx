import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {AuthContext} from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
function DriverSignup() {

    const auth = useContext(AuthContext);
    const history = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const onFormSubmit =async e => {
  
      e.preventDefault();
      var li = document.getElementById('em'). value;
      var name =document.getElementById('name').value;

      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signupDriver',
          'POST',
          JSON.stringify({
            name: name,
             li: li
          }),
          {
            'Content-Type': 'application/json'
          }
        );
  
        //auth.login(responseData.user.email,responseData.token);
        //document.getElementById('em'). value="";
        //document.getElementById('pass'). value="";
        //document.getElementById('name'). value="";
        //history('/');
      } catch (err) {}
   
    }
    const routeChange= () =>{ 
  
      history('/');
    };

  return (
    <React.Fragment>
    <Card>
        <Card.Body>
        <Card.Title>Signin</Card.Title>
        <Card.Text>
    <Form  onSubmit={onFormSubmit}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>name</Form.Label>
        <Form.Control type="text" id="name" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>li</Form.Label>
        <Form.Control type="text" id="em" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Card.Text>
    </Card.Body>
    </Card>
    </React.Fragment>
  );
}

export default DriverSignup;