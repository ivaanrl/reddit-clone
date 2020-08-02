import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import faker from "faker";
import CreateCommunityConnector from "../modules/homepage/sidebar/createPostCommunity/createCommunity/CreateCommunityConnector";

const mockSelector = jest.fn();
const mockDispatch = jest.fn();
const mockCloseForm = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));
const DOWN_ARROW = { keyCode: 40 };

test("can create subreddit", async () => {
  const { getByLabelText, getByText, getByTestId } = render(
    <CreateCommunityConnector closeForm={mockCloseForm} />
  );

  const name = faker.name.firstName();
  const description = faker.lorem.words(5);

  const getSelectItem = async (
    getByText: any,
    getByTestId: any,
    getByLabelText: any
  ) => async (selectLabel: string, itemText: string) => {
    fireEvent.click(getByTestId(selectLabel));
    fireEvent.keyDown(getByTestId(selectLabel), DOWN_ARROW);
    await waitForElement(() => getByLabelText(itemText));
    fireEvent.click(getByLabelText(itemText));
  };

  const nameInput = screen.getByLabelText("Name");
  const descriptionInput = screen.getByLabelText("Description");
  const submitButton = screen.getByRole("button", { name: "CREATE COMMUNITY" });

  await act(async () => {
    const selectItem = await getSelectItem(
      getByText,
      getByTestId,
      getByLabelText
    );
    await userEvent.type(nameInput, name);
    await userEvent.type(descriptionInput, description);
    await selectItem("react-select-container", "Activism");

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
