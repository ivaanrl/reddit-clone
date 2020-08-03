import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import faker from "faker";
import CreateCommunityConnector from "../modules/homepage/sidebar/createPostCommunity/createCommunity/CreateCommunityConnector";
import { communityTopics } from "@reddit-clone/common";
import selectEvent from "react-select-event";

const mockDispatch = jest.fn();
const mockCloseForm = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const DOWN_ARROW = { keyCode: 40 };

test("can create subreddit", async () => {
  const { getByLabelText } = render(
    <CreateCommunityConnector closeForm={mockCloseForm} />
  );

  const name = faker.name.firstName();
  const description = faker.lorem.words(5);

  const nameInput = screen.getByLabelText("Name");
  const descriptionInput = screen.getByLabelText("Description");
  const submitButton = screen.getByRole("button", { name: "CREATE COMMUNITY" });

  await act(async () => {
    await userEvent.type(nameInput, name);
    await userEvent.type(descriptionInput, description);
    await selectEvent.select(getByLabelText("Topics"), "Funny/Humor");
    fireEvent.click(submitButton);
  });

  expect(mockDispatch).toHaveBeenLastCalledWith({
    type: ActionTypes.CREATE_SUBREDDIT,
    payload: {
      name,
      description,
      adultContent: false,
      communityTopics: ["funny/humor"],
    },
  });
});
