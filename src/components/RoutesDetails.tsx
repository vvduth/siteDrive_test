import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBusRoutes } from "../store/busRoutesSlice";
import { Col, ListGroup, Row, Table, Accordion } from "react-bootstrap";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RoutesDetails = (props) => {
  let params = useParams();
  //console.log(params.id);
  let i: number = 0;
  const routes = useAppSelector((state) => state.buses.routes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBusRoutes(params.id));
  }, []);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {routes && (
        <>
          <Row>
            <Col md={6}>
              <Accordion defaultActiveKey={["0"]} alwaysOpen>
                {routes.patterns.map((pattern) => (
                  <Accordion.Item key={pattern.code} eventKey={pattern.code}>
                    <Accordion.Header>Public transport number: <strong>{' ' + pattern.route.shortName}</strong></Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>Type of transport: {' ' + pattern.route.mode}</li>
                        <li>Full Route: {' ' + pattern.route.longName}</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{routes.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>Latitude: {routes.lat}</ListGroup.Item>
                <ListGroup.Item>Longtitude: {routes.lon}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row></Row>
        </>
      )}
    </>
  );
};

export default RoutesDetails;
