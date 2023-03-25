import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {AuthContext} from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
function Signup() {

    const auth = useContext(AuthContext);
    const history = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const onFormSubmit =async e => {
  
      e.preventDefault();
      var email = document.getElementById('em'). value;
      var password = document.getElementById('pass').value;
      var name =document.getElementById('name').value;
      console.log(email);
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: name,
             email: email,
             password:password
          }),
          {
            'Content-Type': 'application/json'
          }
        );
  
        auth.login(responseData.user.email,responseData.token);
        document.getElementById('em'). value="";
        document.getElementById('pass'). value="";
        document.getElementById('name'). value="";
      } catch (err) {}
   
    }
    const routeChange= () =>{ 
  
      history.push('/');
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
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" id="em" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" id="pass" placeholder="Password" />
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

export default Signup;