import {
  render,
  screen,
  act,
} from "@testing-library/react-native";

import { Provider } from "react-redux";
import store from "../store";
import {
  wordsLearningActions,
} from "../store/wordsLearningSlice";
import * as constants from "../constants";
import words from "./testData";
import Statistics from "../screens/Learning/Statistics";
constants.INITIAL_FORGETTING_SPAN = 1000 / 2;
constants.REFRESH_STATUSES_SPAN = 1000;

afterEach(() => {
  jest.useRealTimers();
});

test(`With one word it behaves correctly on Statistics screen and stores correct data`, async () => {
  jest.useFakeTimers();
  await act(async () => {
    store.dispatch(wordsLearningActions.addWord(words[0]));
    store.dispatch(wordsLearningActions.addWord(words[1]));
    store.dispatch(wordsLearningActions.addWord(words[2]));
    jest.advanceTimersByTime(50);
  });

  expect(store.getState().wordsLearning.words[0].status).toBe(0);
  expect(store.getState().wordsLearning.words[1].status).toBe(0);
  expect(store.getState().wordsLearning.words[2].status).toBe(0);

  render(
    <Provider store={store}>
      <Statistics />
    </Provider>
  );

  let toLearnText = screen.getByText(`To learn`);
  let toLearnValue = toLearnText.parent.parent.children[0].children[0];
  expect(toLearnValue).toHaveTextContent("3");

  let inProcessText = screen.getByText(`In process`);
  let inProcessValue = inProcessText.parent.parent.children[0].children[0];
  expect(inProcessValue).toHaveTextContent("0");

  let learnedText = screen.getByText(`In process`);
  let learnedValue = learnedText.parent.parent.children[0].children[0];
  expect(learnedValue).toHaveTextContent("0");
  await act(async () => {
    store.dispatch(wordsLearningActions.updateWordLearnInfo(words[0].word));
    jest.advanceTimersByTime(50);
  });

  toLearnText = screen.getByText(`To learn`);
  toLearnValue = toLearnText.parent.parent.children[0].children[0];
  expect(toLearnValue).toHaveTextContent("2");

  inProcessText = screen.getByText(`In process`);
  inProcessValue = inProcessText.parent.parent.children[0].children[0];
  expect(inProcessValue).toHaveTextContent("0");

  learnedText = screen.getByText(`Learned`);
  learnedValue = learnedText.parent.parent.children[0].children[0];
  expect(learnedValue).toHaveTextContent("1");

  jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
  await act(async () => {
    store.dispatch(wordsLearningActions.updateWordLearnInfo(words[1].word));
    store.dispatch(wordsLearningActions.updateStatuses());
    jest.advanceTimersByTime(50);
  });

  toLearnText = screen.getByText(`To learn`);
  toLearnValue = toLearnText.parent.parent.children[0].children[0];
  expect(toLearnValue).toHaveTextContent("1");

  inProcessText = screen.getByText(`In process`);
  inProcessValue = inProcessText.parent.parent.children[0].children[0];
  expect(inProcessValue).toHaveTextContent("1");

  learnedText = screen.getByText(`Learned`);
  learnedValue = learnedText.parent.parent.children[0].children[0];
  expect(learnedValue).toHaveTextContent("1");

  jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
  await act(async () => {
    store.dispatch(wordsLearningActions.updateStatuses());
    jest.advanceTimersByTime(50);
  });
  toLearnText = screen.getByText(`To learn`);
  toLearnValue = toLearnText.parent.parent.children[0].children[0];
  expect(toLearnValue).toHaveTextContent("2");

  inProcessText = screen.getByText(`In process`);
  inProcessValue = inProcessText.parent.parent.children[0].children[0];
  expect(inProcessValue).toHaveTextContent("1");

  learnedText = screen.getByText(`Learned`);
  learnedValue = learnedText.parent.parent.children[0].children[0];
  expect(learnedValue).toHaveTextContent("0");

  jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
  await act(async () => {
    store.dispatch(wordsLearningActions.updateStatuses());
    jest.advanceTimersByTime(50);
  });

  toLearnText = screen.getByText(`To learn`);
  toLearnValue = toLearnText.parent.parent.children[0].children[0];
  expect(toLearnValue).toHaveTextContent("3");

  inProcessText = screen.getByText(`In process`);
  inProcessValue = inProcessText.parent.parent.children[0].children[0];
  expect(inProcessValue).toHaveTextContent("0");

  learnedText = screen.getByText(`Learned`);
  learnedValue = learnedText.parent.parent.children[0].children[0];
  expect(learnedValue).toHaveTextContent("0");
}, 10000);
