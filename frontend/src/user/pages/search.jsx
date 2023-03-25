import React, {useContext,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Row from "react-bootstrap/Row";
import List from '../components/List';
import {AuthContext} from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
function Search() {

    const auth = useContext(AuthContext);
    const history = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedRecipes, setLoadedRecipes] = useState();

    const onFormSubmit =async e => {
  
        e.preventDefault();
        var name =document.getElementById('name').value;
        console.log(name);
        try {
          const responseData = await sendRequest(
            `http://localhost:5000/api/users/search/${name}`
          );
    
          //auth.login(responseData.user.email,responseData.token);
          setLoadedRecipes(responseData.recipes);
            console.log("here");
          document.getElementById('name'). value="";
        } catch (err) {}
     
      }
    const routeChange= () =>{ 
  
      history.push('/');
    };

  return (
    <React.Fragment>
    {!loadedRecipes &&( <Card>
        <Card.Body>
        <Card.Title>Search</Card.Title>
        <Card.Text>
    <Form  onSubmit={onFormSubmit}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>name</Form.Label>
        <Form.Control type="text" id="name" placeholder="Enter email" />
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
    </Card>)}
    {loadedRecipes && (<div>
            <div
                style={{
                    marginLeft: "2rem",
                    marginRight: "1rem",
                    marginTop: "1rem",
                    minHeight: "80vh",
                }}
            >
            <Row  md={12} sm={0}>
                
                <Col
                style={{  
                    position:'sticky',
                    borderRight: "1px solid rgba(0, 0, 0, 0.5)",
                    }}
                    sm={2}
                    
                >
                    <div style={{position:'sticky'}}>
                    <Card 
                    sticky="top"
                    >
                        <Card.Body>
                            <List/>
                        </Card.Body>
                    </Card>
                    </div>
                </Col>
                
                <Col sm={10}
                 style={{
                    borderRight: "1px solid rgba(0, 0, 0, 0.5)",
                }}>
                    <Row xs={1} md={4} className="g-4">
      {loadedRecipes && loadedRecipes.map(recipe => (
        <Col>
          <Card>
            <Card.Img variant="top" src={`http://localhost:5000/${recipe.image}`} />
            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>
              <Card.Text>
                {recipe.ing1}
                {recipe.ing2}
                {recipe.ing3}
                {recipe.ing4}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
                    
                    
                </Col>
            </Row>
        </div>{" "}
        </div>
    )}
    </React.Fragment>
  );
}

export default Search;