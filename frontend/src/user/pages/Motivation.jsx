import React,{useState,useEffect} from "react";
import YoutubeEmbed from "./Youtube";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import image from '../../jj.jpg';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import List from '../components/List';
import '../../css/card.css';
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/useHttpClient";
const Motivation = ()=> {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedRecipes, setLoadedRecipes] = useState();
    
    useEffect(() => {
      const fetchUsers = async () => {
   
        try {
          const responseData = await sendRequest(
            'http://localhost:5000/api/users/videos/motivation');
  
  
            setLoadedRecipes(responseData.videos);
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
                                  Motivation Videos
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
                <div>
                  <Link to={`http://localhost:3000/video/${recipe.li}`} >
                      <Card border="info" className="DoctorListCards">
                          <br />
                          <font className="DoctorIcon">
                              <i className="fas fa-user-md fa-9x"></i>
                          </font>
                          <Card.Body>
                              <Card.Title
                                  style={{ fontSize: "2rem", color: "#195a65" }}
                              >
                                  {recipe.name}
                              </Card.Title>
                              
                          </Card.Body>
                      </Card>
                  </Link>
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

export default Motivation;