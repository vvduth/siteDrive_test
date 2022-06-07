import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { receivedStops } from "../store/stopSlice";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import StopListDisplay from "./StopListDisplay";

const Stops = () => {
  

  useEffect(() => {
    
  }, []);
  const stops = useAppSelector((state) => state.stops.stops);
  // we store stops in stroe as object,m not an array
  return (
    <>
      <h3>Stops based on your search</h3>
      {!stops.stops && <div>Type something and press search</div>}
      <Row>
        {Object.values(stops).map((stop) => (
          <Col key= {stop.gtfsId} sm={12} md={6} lg>
              <StopListDisplay stop={stop} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Stops;
