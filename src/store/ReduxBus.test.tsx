import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "../components/SearchBox";
import { Provider } from "react-redux";
import { store } from "./store";

test("testSearchButton", () => {
  // Arrange
  const onClick = jest.fn();
  render(
    <Provider store={store}>
      <SearchBox  />
    </Provider>
  );

  // act
  
  const searchButton = screen.getByRole("button");
    searchButton.onclick = onClick ;
    fireEvent.click(searchButton);
  // assert
  
  expect(onClick).toHaveBeenCalledTimes(1);
});
