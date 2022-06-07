import React from "react";
import { Card } from "react-bootstrap";
import { Stop } from "../store/stopSlice";

const StopListDisplay = ({ stop }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Title as="div">
          <strong>{stop.name}</strong>
        </Card.Title>

        <Card.Title as="div">
          <strong>Lat: {stop.lat}</strong>
        </Card.Title>

        <Card.Title as="div">
          <strong>Long: {stop.lon}</strong>
        </Card.Title>
      </Card.Body>

      
        
     
    </Card>
  );
};

export default StopListDisplay;
