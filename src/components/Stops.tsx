import React from "react";
import { useAppSelector } from "../store/hooks";

const Stops = () => {
  const stops = useAppSelector((state) => state.stops.stops);
  return (
    <>
      <ul>
        {Object.values(stops).map((stop) => (
          <div>{stop.name}</div>
        ))}
      </ul>
    </>
  );
};

export default Stops;
