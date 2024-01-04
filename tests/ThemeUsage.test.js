import {
  render,
  screen,
  fireEvent,
  act,
  userEvent,
} from "@testing-library/react-native";
import { COLORS_LIGHT, COLORS_DARK } from "../constants";

import { Provider } from "react-redux";
import store from "../store";
import App from "../App";

afterEach(() => {
  jest.useRealTimers();
});

test(`theme is applied on AllWords screen`, async () => {
  jest.useFakeTimers();
  const user = userEvent.setup();

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  let noWordsYetText = screen.getByText(`No words yet`);
  expect(noWordsYetText).toHaveStyle({ color: COLORS_DARK.primary200 });
  let noWordsContainer = noWordsYetText.parent.parent;
  expect(noWordsContainer).toHaveStyle({
    backgroundColor: COLORS_DARK.fontInverse,
  });

  const settingsMenuItem = screen.getByText(`Settings`);
  await act(async () => {
    user.press(settingsMenuItem);
    jest.advanceTimersByTime(50);
  });

  const switchElement = screen.getByRole(`switch`);

  fireEvent(switchElement, "valueChange", false);
  expect(switchElement.props.value).toBeFalsy();

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText.parent.parent.props.style).toEqual(
    expect.objectContaining({
      backgroundColor: COLORS_LIGHT.appBackground,
    })
  );

  const wordsMenuItem = screen.getByText(`Words`);
  await act(async () => {
    user.press(wordsMenuItem);
    jest.advanceTimersByTime(50);
  });

  noWordsYetText = screen.getByText(`No words yet`);
  expect(noWordsYetText).toHaveStyle({ color: COLORS_LIGHT.primary200 });
  noWordsContainer = noWordsYetText.parent.parent;
  expect(noWordsContainer).toHaveStyle({
    backgroundColor: COLORS_LIGHT.fontInverse,
  });
});
