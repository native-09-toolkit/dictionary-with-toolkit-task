import {
  render,
  screen,
  userEvent,
  act,
} from "@testing-library/react-native";

import { Provider } from "react-redux";
import store from "../store";
import {
  wordsLearningActions,
} from "../store/wordsLearningSlice";
import * as constants from "../constants";
import words from "./testData";
import MainNavigator from "../navigators/MainNavigator";

constants.INITIAL_FORGETTING_SPAN = 1000 / 2;
constants.REFRESH_STATUSES_SPAN = 1000;

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
  jest.resetAllMocks();
});

test(`Edit Word edits word in the store`, async () => {
  jest.useFakeTimers();
  const user = userEvent.setup();
  await act(async () => {
    store.dispatch(wordsLearningActions.addWord(words[0]));
  });

  render(
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );

  let wordText = screen.getByText(words[0].word);
  await act(async () => {
    user.press(wordText);
    jest.advanceTimersByTime(50);
  });

  const explanationInput = screen.getByDisplayValue(
    "used as a greeting or to begin a phone conversation."
  );

  const newExplanationValue = "new explanation";
  await act(async () => {
    await user.clear(explanationInput);
    await user.type(explanationInput, newExplanationValue);
    jest.advanceTimersByTime(50);
  });

  const saveButton = await screen.findByText("Save");
  await act(async () => {
    await user.press(saveButton);
    jest.advanceTimersByTime(50);
  });

  expect(store.getState().wordsLearning.words[0].meaning).toEqual(
    newExplanationValue
  );
});
