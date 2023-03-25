import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import image from '../../jj.jpg';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import List from '../components/List';

let items = [];
for (let i = 0; i < 20; i++) {
    items.push(<Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>);
}

const SList = () => {

    const USERS = [
        {
          id: 'u1',
          name: 'Max Schwarz',
          image:
            'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          places: 3
        }
      ];
  return (
  <div style={{marginLeft:'1rem',
            marginRight:'1rem'}}>
                    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 20 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
        </div>
    );
};

export default SList;