import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { receivedStops } from "../store/stopSlice";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import StopListDisplay from "./StopListDisplay";

const Stops = () => {
  const config = {
    headers: {
      "Content-Type": "application/graphql",
    },
  };

  const body2 = `{
    stops(name: "Innopoli") {
      gtfsId
      name
      code
      lat
      lon
    }
  }`;

  const dispatch = useAppDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`,
        body2,
        config
      );
      console.log(response.data.data.stops);
      dispatch(receivedStops(response.data.data.stops))
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const stops = useAppSelector((state) => state.stops.stops);
  // we store stops in stroe as object,m not an array
  return (
    <>
      <h3>Stops based on your search</h3>
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
