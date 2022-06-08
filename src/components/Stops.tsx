import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { Col, ListGroup, Row } from "react-bootstrap";
import { resetDepart } from "../store/departSlice";

import StopListDisplay from "./StopListDisplay";

const Stops = () => {
  const departures = useAppSelector((state) => state.depart.departures);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //dispatch(resetDepart);
  }, [dispatch]);
  const stops = useAppSelector((state) => state.stops.stops);
  // we store stops in stroe as object,m not an array
  return (
    <>
      <h3 style={{margin: "auto" , width: "50%", padding: "10px"}}>Type something on the search Box</h3>
      <Row>
        
        {Object.values(stops).map((stop) => (
          <Col key={stop.gtfsId} sm={12} md={6} lg>
            <StopListDisplay stop={stop} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Stops;
