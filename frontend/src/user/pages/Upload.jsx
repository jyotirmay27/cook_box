import React,{useState,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ImageUpload from '../components/ImageUpload';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../shared/context/auth-context'

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
        var email = document.getElementById('em'). value;
        //var password = document.getElementById('name').value;
        console.log(email);
        //console.log(password);
        //document.getElementById('em'). value="";
        //document.getElementById('pass'). value="";
        history('/home');
    };

  return (
    <React.Fragment>
    <Card>
        <Card.Body>
        <Card.Title>Upload</Card.Title>
        <Card.Text>
            <div className='m-auto form-signin w-100'>
    <Form  onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" id="em" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>name of the dish</Form.Label>
        <Form.Control type="text" id="name" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ingredient 1</Form.Label>
        <Form.Control type="text" id="ing1" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ingredient 2</Form.Label>
        <Form.Control type="text" id="ing2" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ingredient 3</Form.Label>
        <Form.Control type="text" id="ing3" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ingredient 4</Form.Label>
        <Form.Control type="text" id="ing4" placeholder="Password" />
      </Form.Group>
      <ImageUpload center id="image" onInput={inputHandler}/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </Card.Text>
    </Card.Body>
    </Card>
    </React.Fragment>
  );
}

export default Upload;