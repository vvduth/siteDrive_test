/* eslint-disable testing-library/no-node-access */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBox from "../components/SearchBox";
import { Provider } from "react-redux";
import { store } from "./store";
import userEvent from "@testing-library/user-event";

test("testSearchButton", () => {
  // Arrange
  const onClick = jest.fn();
  render(
    <Provider store={store}>
      <SearchBox />
    </Provider>
  );

  // act

  const searchButton = screen.getByRole("button");
  searchButton.onclick = onClick;
  fireEvent.click(searchButton);
  // assert

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("testOnSubmitAfterFillingTheBox", async () => {
    // Arrange
    const onSubmit = jest.fn();

    const {container} = render(
        <Provider store={store}>
          <SearchBox />
        </Provider>
      );

    user.type(getStopsName(), 'hel');

    // eslint-disable-next-line testing-library/no-container
    // eslint-disable-next-line testing-library/no-node-access
    // eslint-disable-next-line testing-library/no-container
    const form = container.querySelector('form');
    form.onsubmit = onSubmit ;
    const stopText = screen.getByRole('textbox');
    const seacrhButton = screen.getByRole('button', {
        name: /search/i
      });
    
    // act
    userEvent.click(seacrhButton);


    // assert 
    await waitFor(()=> {
        expect(onSubmit).toHaveBeenCalledTimes(1);
    })
    expect(stopText).toBeInTheDocument() ;
    expect(form).toBeInTheDocument() ;
})



function getStopsName ( ) {
    return screen.getByRole('textbox');
}