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
});

test(`Shows correct battery icons near words`, async () => {
  jest.useFakeTimers();
  const user = userEvent.setup();
  await act(async () => {
    store.dispatch(wordsLearningActions.addWord(words[0]));
  });

  expect(store.getState().wordsLearning.words[0].status).toBe(0);

  render(
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );

  let wordText = screen.getByText(words[0].word);
  let icon = wordText.parent.parent.children[1];
  expect(icon.props.name).toContain("dead");

  await act(async () => {
    store.dispatch(wordsLearningActions.updateWordLearnInfo(words[0].word));
  });

  wordText = screen.getByText(words[0].word);
  icon = wordText.parent.parent.children[1];
  expect(icon.props.name).toContain("full");

  await act(async () => {
    jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
    store.dispatch(wordsLearningActions.updateStatuses());
  });

  wordText = screen.getByText(words[0].word);
  icon = wordText.parent.parent.children[1];
  expect(icon.props.name).toContain("half");

  await act(async () => {
    jest.advanceTimersByTime(constants.INITIAL_FORGETTING_SPAN);
    store.dispatch(wordsLearningActions.updateStatuses());
  });

  wordText = screen.getByText(words[0].word);
  icon = wordText.parent.parent.children[1];
  expect(icon.props.name).toContain("dead");
});
