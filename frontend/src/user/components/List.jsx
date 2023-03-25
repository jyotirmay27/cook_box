import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const List = () => {

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
    <ListGroup>
            <ListGroup.Item action href="#link1">
              Link 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Link 2
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Link 3
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Link 4
            </ListGroup.Item>
          </ListGroup>
  );
};

export default List;
