import React,{useState,useContext} from 'react';
import { Card, Button,Form, Row, Col} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import '../../css/Login.css'
import ImageUpload from '../components/ImageUpload';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../shared/context/auth-context'
import "../../css/Allergy.css";

function Upload() {
    const [file, setFile] = useState();
    const history = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const inputHandler = (id, pickedFile, fileIsValid)=>{
        if(fileIsValid)
        {
            setFile(pickedFile);
            console.log(pickedFile);
        }
    }
    const onFormSubmit =async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',auth.userId);
        formData.append('name', document.getElementById('name').value);
        formData.append('ing1', document.getElementById('ing1').value);
        formData.append('ing2', document.getElementById('ing2').value);
        formData.append('ing3', document.getElementById('ing3').value);
        formData.append('ing4', document.getElementById('ing4').value);
        formData.append('image', file);
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/upload',
          'POST',
          formData
        );

        //auth.login(responseData.user.id);
        //var email = document.getElementById('em'). value;
        //var password = document.getElementById('name').value;
        //console.log(email);
        //console.log(password);
        //document.getElementById('em'). value="";
        //document.getElementById('pass'). value="";
        history('/home');
    };

  return (
    <React.Fragment>
                    
                  <div className="BGGrad">
                  <Row className="TopMargin"></Row>
                  <Card
                      // className="cont"
                      bg="light"
                      className="MainCard"
                  >
                      <br />
                      <br />
                      <br />
                      <font color="#6e7582">
                          <i className="fas fa-hospital-user fa-8x"></i>
                      </font>
                      <br />
                    <Card.Body>
                      <Card.Title className="heading"><h1 className="CardTitleFont">Upload</h1></Card.Title>
                      <Card.Text>
                        <Form className="form-signin" onSubmit={onFormSubmit}>
                          <Form.Group controlId="formBasicEmail">
                          <InputGroup className="mb-3">

                            <Form.Control type="text" id="name" placeholder="Name of Dish" className="FormStyle" />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                          <InputGroup className="mb-3">

                            <Form.Control type="text" id="ing1" placeholder="Ingredient" className="FormStyle" />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                          <InputGroup className="mb-3">

                            <Form.Control type="text" id="ing2" placeholder="Ingredient" className="FormStyle" />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                          <InputGroup className="mb-3">

                            <Form.Control type="text" id="ing3" placeholder="Ingredient" className="FormStyle" />
                            </InputGroup>
                          </Form.Group>
                          <Form.Group controlId="formBasicEmail">
                          <InputGroup className="mb-3">

                            <Form.Control type="text" id="ing4" placeholder="Ingredient" className="FormStyle" />
                            </InputGroup>
                          </Form.Group>
                            <br></br>
                         <ImageUpload center id="image" onInput={inputHandler}/>

                          <Button  style={{
                                      backgroundColor: "#43bfc7",
                                     fontFamily: "Montserrat, sans-serif",
                                     fontWeight: "600",
                                              }} className="button1"  type="submit">Log In</Button>
                        </Form>
                      </Card.Text>
                    </Card.Body>
                    </Card>
                  </div>
                  </React.Fragment>
    //<React.Fragment>
    //<Card>
    //    <Card.Body>
    //    <Card.Title>Upload</Card.Title>
    //    <Card.Text>
    //        <div className='m-auto form-signin w-100'>
    //<Form  onSubmit={onFormSubmit}>
    //  <Form.Group className="mb-3" controlId="formBasicEmail">
    //    <Form.Label>Email address</Form.Label>
    //    <Form.Control type="email" id="em" placeholder="Enter email" />
    //    <Form.Text className="text-muted">
    //      We'll never share your email with anyone else.
    //    </Form.Text>
    //  </Form.Group>

    //  <Form.Group className="mb-3" controlId="formBasicPassword">
    //    <Form.Label>name of the dish</Form.Label>
    //    <Form.Control type="text" id="name" placeholder="Password" />
    //  </Form.Group>
    //  <Form.Group className="mb-3" controlId="formBasicPassword">
    //    <Form.Label>Ingredient 1</Form.Label>
    //    <Form.Control type="text" id="ing1" placeholder="Password" />
    //  </Form.Group>
    //  <Form.Group className="mb-3" controlId="formBasicPassword">
    //    <Form.Label>Ingredient 2</Form.Label>
    //    <Form.Control type="text" id="ing2" placeholder="Password" />
    //  </Form.Group>
    //  <Form.Group className="mb-3" controlId="formBasicPassword">
    //    <Form.Label>Ingredient 3</Form.Label>
    //    <Form.Control type="text" id="ing3" placeholder="Password" />
    //  </Form.Group>
    //  <Form.Group className="mb-3" controlId="formBasicPassword">
    //    <Form.Label>Ingredient 4</Form.Label>
    //    <Form.Control type="text" id="ing4" placeholder="Password" />
    //  </Form.Group>
    //  <ImageUpload center id="image" onInput={inputHandler}/>
    //  <Button variant="primary" type="submit">
    //    Submit
    //  </Button>
    //</Form>
    //</div>
    //</Card.Text>
    //</Card.Body>
    //</Card>
    //</React.Fragment>
  );
}

export default Upload;