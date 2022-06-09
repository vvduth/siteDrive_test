/* eslint-disable testing-library/no-container */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBox from "../components/SearchBox";
import { Provider } from "react-redux";
import { store } from "./store";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import {setupServer} from 'msw/node'
import { Stop } from "./stopSlice";
import Stops from "../components/Stops"

interface RequestBody {
  query: string;
}
interface Response {
  data: {
    data: {
      stops: Stop[];
    };
  };
}

const worker = setupServer(
  graphql.mutation<Response, RequestBody>(
    "getAllMAtchingStops",
    (req, res, ctx) => {
      const { query } = req.variables;
      return res(
        ctx.data({
          data: {
            data: {
              stops: [],
            },
          },
        })
      );
    }
  )
);
beforeAll(()=> worker.listen());
afterEach(()=> worker.resetHandlers())
afterAll(()=> worker.close())

test("testAsyncCode", async () => {
  // Arrange
  const onSubmit = jest.fn();

  const { container } = render(
    <Provider store={store}>
      <SearchBox />
      <Stops />
    </Provider>
  );

  user.type(getStopsName(), "sdsadsa");

  // eslint-disable-next-line testing-library/no-container
  // eslint-disable-next-line testing-library/no-node-access
  // eslint-disable-next-line testing-library/no-container
  // eslint-disable-next-line testing-library/no-node-access
  const form = container.querySelector("form");
  form.onsubmit = onSubmit;
  const stopText = screen.getByRole("textbox");
  const seacrhButton = screen.getByRole("button", {
    name: /search/i,
  });


  // act
  userEvent.click(seacrhButton);
  
  const output = await screen.findByText("Data loaded and no matches")
  // assert

  expect(output).toBeInTheDocument() ;
});

function getStopsName ( ) {
    return screen.getByRole('textbox');
}
