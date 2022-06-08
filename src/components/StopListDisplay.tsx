import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const StopListDisplay = ({ stop }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <span>
        <i className="fa-solid fa-bus"></i>
        </span>
        <Card.Title as="div">
          <strong>{stop.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <div className="my-3">Lat: {stop.lat}</div>
        </Card.Text>

        <Card.Text as="div">
          <div className="my-3">Lon: {stop.lon}</div>
        </Card.Text>
      </Card.Body>

      <Link to={`/details/${stop.gtfsId}`}><Button variant="outline-warning">See Details </Button>{' '}</Link>
        
     
    </Card>
  );
};

export default StopListDisplay;
