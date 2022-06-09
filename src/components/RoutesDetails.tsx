import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBusRoutes } from "../store/busRoutesSlice";
import {
  fetchDepartSchedule,
  resetDepart,
  EdgeType,
} from "../store/departSlice";
import { Col, ListGroup, Row, Table, Accordion, Button } from "react-bootstrap";
export interface Param {
  lon: number;
  lat: number;
}

const RoutesDetails = (props) => {
  let params = useParams();
  const [laterDeparture, setLaterDepartures] = useState<EdgeType>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const routes = useAppSelector((state) => state.buses.routes);
  const departures = useAppSelector((state) => state.depart.departures);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBusRoutes(params.id));
    dispatch(resetDepart(null));
  }, []);

  const onClickHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const param = {
      lon: routes.lon,
      lat: routes.lat,
    };
    dispatch(fetchDepartSchedule(param));
  };

  const showNextDepartHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let d = new Date();
    let ev: any = new Date(d);
    let msSinceMidnight = ev - d.setHours(0, 0, 0, 0);
    let secondsSinceMidnight = msSinceMidnight * 0.001;
    console.log(secondsSinceMidnight);

    const firstLayerFilterArray = departures.edges.filter(
      (item) => item.node.place.stoptimes.length
    );
    const secondLayerFilterArray = firstLayerFilterArray.filter(
      (item) =>
        item.node.place.stoptimes[0].scheduledDeparture - secondsSinceMidnight >
        0
    );
    console.log("firstLayer", firstLayerFilterArray);
    console.log("secondLayer", secondLayerFilterArray);
    secondLayerFilterArray.sort(function (a, b) {
      return (
        a.node.place.stoptimes[0].scheduledDeparture -
        b.node.place.stoptimes[0].scheduledDeparture
      );
    });
    console.log("secondLayerAfterSort", secondLayerFilterArray);
    setLaterDepartures(secondLayerFilterArray[0]);
    setCurrentTime(secondsSinceMidnight);
  };
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
                    <Accordion.Header>
                      Public transport number:{" "}
                      <strong>{" " + pattern.route.shortName}</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>Type of transport: {" " + pattern.route.mode}</li>
                        <li>Full Route: {" " + pattern.route.longName}</li>
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
                {!departures && (
                  <Button onClick={onClickHandler}>Load the next bus departs</Button>
                )}
                {departures && (
                  <Button onClick={showNextDepartHandler}>
                    Data Loaded, click again to check the bus
                  </Button>
                )}
                <ListGroup.Item>Latitude: {routes.lat}</ListGroup.Item>
                <ListGroup.Item>Longtitude: {routes.lon}</ListGroup.Item>
                {laterDeparture && (
                  <>
                    <ListGroup.Item>
                      Next Bus depart:{" "}
                      {
                        laterDeparture.node.place.stoptimes[0].trip.route
                          .shortName
                      }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Next Bus depart:{" "}
                      {Math.floor(
                        (laterDeparture.node.place.stoptimes[0]
                          .scheduledDeparture -
                          currentTime) /
                          3600
                      ) +
                        " hours " +
                        Math.floor(((laterDeparture.node.place.stoptimes[0]
                          .scheduledDeparture -
                          currentTime)/3600 - Math.floor(
                            (laterDeparture.node.place.stoptimes[0]
                              .scheduledDeparture -
                              currentTime) /
                              3600
                          ))*60) +
                        " minutes"}
                    </ListGroup.Item>
                  </>
                )}
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
