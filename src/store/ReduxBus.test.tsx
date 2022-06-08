import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "../components/SearchBox";
import { Provider } from "react-redux";
import { store } from "./store";

test("reduxFetchStops", () => {
  // Arrange
  render(
    <Provider store={store}>
      <SearchBox />
    </Provider>
  );

  // act
  const searchButton = screen.getByRole("button");

  // assert
  expect(searchButton).toBeInTheDocument();
});
