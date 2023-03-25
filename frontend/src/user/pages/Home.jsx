import React,{useState,useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import image from '../../jj.jpg';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import List from '../components/List';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import { useNavigate } from 'react-router-dom';
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
    );
};

export default Home;