import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchStops, receivedStops } from "../store/stopSlice";

const SearchBox = () => {
  const [keyword, setKeyword] = useState<string>("");
  const allStops = useAppSelector((state)=> state.stops.stops);
  
  const dispatch = useAppDispatch() ;

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
   
    dispatch(fetchStops(keyword))
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for stops..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit"  className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
