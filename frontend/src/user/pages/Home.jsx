import React,{useState,useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//import image from '../../jj.jpg';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import List from '../components/List';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
import '../../css/card.css';
import { Link } from "react-router-dom";

//let items = [];
//for (let i = 0; i < 20; i++) {
//    items.push(<Card style={{ width: '18rem' }}>
//    <Card.Body>
//      <Card.Title>Card Title</Card.Title>
//      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//      <Card.Text>
//        Some quick example text to build on the card title and make up the
//        bulk of the card's content.
//      </Card.Text>
//      <Card.Link href="#">Card Link</Card.Link>
//      <Card.Link href="#">Another Link</Card.Link>
//    </Card.Body>
//  </Card>);
//}

const Home = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedRecipes, setLoadedRecipes] = useState();
    const history = useNavigate();

    useEffect(() => {
      const fetchUsers = async () => {
   
        try {
          const responseData = await sendRequest(
            'http://localhost:5000/api/users/all');
  
  
            setLoadedRecipes(responseData.recipes);
        } catch (err) {
  console.log(err);
        }
      };
      fetchUsers();

      console.log(loadedRecipes);
    }, [sendRequest]);
    const routeChange= () =>{ 
  
        history('/order');
      };

  return (
  <div>
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
                            Recipes
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
          {/*<Card>
            <Card.Img variant="top" src={`http://localhost:5000/${recipe.image}`} />
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                
              </Card.Text>
            </Card.Body>
          </Card>*/}
          <div>
                <Card border="info" className="DoctorListCards">
                    <br />
                    <font className="DoctorIcon">
                        <i className="fas fa-user-md fa-9x"></i>
                    </font>

                    <Card.Body>
                    <Link to={`http://localhost:5000/${recipe.image}`} target = "_blank">

                        <Card.Title
                            style={{ fontSize: "2rem", color: "#195a65" }}
                        >
                            {recipe.name}
                        </Card.Title>
                        <Card.Text>
                        
                            <ul>
                             <li >{recipe.ing1}</li>
                             <li > {recipe.ing2}</li>
                             <li >{recipe.ing3}</li>
                             <li >{recipe.ing4}</li>
                                
                            </ul>
                        </Card.Text>
                        </Link>
                    </Card.Body>
                    <Button variant="success" className="DoctorListButtonAppointment" onClick={routeChange}>
                        order
                    </Button>
                </Card>
            
        </div>
        </Col>
      ))}
    </Row>
                    
                    
                </Col>
            </Row>
        </div>{" "}
        </div>
    );
};

export default Home;