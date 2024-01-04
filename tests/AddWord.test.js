import {
  render,
  screen,
  userEvent,
  act,
} from "@testing-library/react-native";

import { Provider } from "react-redux";
import store from "../store";
import * as constants from "../constants";
import words from "./testData";
import MainNavigator from "../navigators/MainNavigator";
import * as wordsService from "../services/wordsHandler";

constants.INITIAL_FORGETTING_SPAN = 1000 / 2;
constants.REFRESH_STATUSES_SPAN = 1000;

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.resetAllMocks();
});

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>;
});

test(`Add Word adds word to the store`, async () => {
  jest.useFakeTimers();
  jest
    .spyOn(wordsService, "getWordInfo")
    .mockImplementationOnce(() => words[0]);
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );

  let plusText = screen.getByText("add-outline");
  await act(async () => {
    user.press(plusText);
    jest.advanceTimersByTime(50);
  });

  const input = screen.getByPlaceholderText("type here..");
  await act(async () => {
    await user.type(input, "hello");
    jest.advanceTimersByTime(2050);
  });

  const addWordButton = await screen.findByText("Add");
  await act(async () => {
    await user.press(addWordButton);
    jest.advanceTimersByTime(50);
  });

  expect(store.getState().wordsLearning.words[0]).toMatchObject(words[0]);
});
