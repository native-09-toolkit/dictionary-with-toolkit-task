import {
  render,
  screen,
  userEvent,
  act,
} from "@testing-library/react-native";

import { Provider } from "react-redux";
import store from "../store";
import Play from "../screens/Learning/Play";
import {
  wordsLearningActions,
} from "../store/wordsLearningSlice";
import * as constants from "../constants";
import words from "./testData";
constants.INITIAL_FORGETTING_SPAN = 1000 / 2;
constants.REFRESH_STATUSES_SPAN = 1000;

afterEach(() => {
  jest.useRealTimers();
});

test(`With empty words array in wordsLearningSlice there is 'Congrats!' on the Play screen`, async () => {
  render(
    <Provider store={store}>
      <Play />
    </Provider>
  );

  const allLearnedText = screen.getByText(`Congrats!`);
  expect(allLearnedText).toBeOnTheScreen();
});

test(`With one word it behaves correctly on play screen and stores correct data`, async () => {
  jest.useFakeTimers();
  const user = userEvent.setup();
  store.dispatch(wordsLearningActions.addWord(words[0]));
  render(
    <Provider store={store}>
      <Play />
    </Provider>
  );

  let wordText = screen.getByText(`hello`);
  expect(wordText).toBeOnTheScreen();
  await act(async () => {
    await userEvent.press(wordText);
    jest.advanceTimersByTime(50);
  });
  let doNotRememberButton = screen.getByText("Didn't know it");
  await act(async () => {
    await user.press(doNotRememberButton);
    jest.advanceTimersByTime(50);
  });

  expect(store.getState().wordsLearning.words[0].status).toBe(0);

  wordText = screen.getByText(`hello`);
  await act(async () => {
    await userEvent.press(wordText);
    jest.advanceTimersByTime(50);
  });

  let rememberButton = screen.getByText("Knew it");
  await act(async () => {
    await user.press(rememberButton);
    jest.advanceTimersByTime(50);
  });

  const allLearnedText = screen.getByText(`Congrats!`);
  expect(allLearnedText).toBeOnTheScreen();

  expect(store.getState().wordsLearning.words[0].status).toBe(2);
  jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
  await act(async () => {
    store.dispatch(wordsLearningActions.updateStatuses());
    jest.advanceTimersByTime(50);
  });
  expect(store.getState().wordsLearning.words[0].status).toBe(1);
  jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
  await act(async () => {
    store.dispatch(wordsLearningActions.updateStatuses());
    jest.advanceTimersByTime(50);
  });
  expect(store.getState().wordsLearning.words[0].status).toBe(0);
});
