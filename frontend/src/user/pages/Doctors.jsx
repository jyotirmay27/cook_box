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
import DocCard from '../components/DocCard';

const Doctors = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedRecipes, setLoadedRecipes] = useState();
    const history = useNavigate();
    const auth = useContext(AuthContext);
    useEffect(() => {
      const fetchUsers = async () => {
   
        try {
          const responseData = await sendRequest(
            'http://localhost:5000/api/users/docs/all');
  
  
            setLoadedRecipes(responseData.docs);
        } catch (err) {
  console.log(err);
        }
      };
      fetchUsers();

      console.log(loadedRecipes);
    }, [sendRequest]);
    const routeChange= (email) =>{ 
  
        history(`/appointment/${email}`);
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
          {/*<Card>
            <Card.Img variant="top" src={`http://localhost:5000/${recipe.image}`} />
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                
              </Card.Text>
            </Card.Body>
          </Card>*/}
          <div>
                <DocCard recipe={recipe} />
                            
                            
                        
            
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

export default Doctors;