import { render, screen, fireEvent } from "@testing-library/react-native";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";
import Settings from "../screens/Settings";

import { Provider } from "react-redux";
import store from "../store";

afterEach(() => {
  jest.useRealTimers();
});

test(`Dark theme is turned on by default`, async () => {
  render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );

  const switchElement = screen.getByRole(`switch`);
  expect(switchElement.props.value).toBeTruthy();
});

test(`Text color is correct in dark theme`, async () => {
  render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText).toHaveStyle({ color: COLORS_DARK.fontMain });

  const lightText = screen.getByText(`Light`);
  expect(lightText).toHaveStyle({ color: COLORS_DARK.fontMain });

  const darkText = screen.getByText(`Dark`);
  expect(darkText).toHaveStyle({ color: COLORS_DARK.fontMain });
});

test(`Container View has dark background when dark theme is selected `, async () => {
  render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText.parent.parent.props.style).toEqual(
    expect.objectContaining({
      backgroundColor: COLORS_DARK.appBackground,
    })
  );
});

test(`Container View has light background when light theme is selected 
and store contains isDark equal to false`, async () => {
  render(
    <Provider store={store}>
      <Settings />
    </Provider>
  );

  const switchElement = screen.getByRole(`switch`);

  fireEvent(switchElement, "valueChange", false);
  expect(switchElement.props.value).toBeFalsy();

  const chooseColorText = screen.getByText(`Choose color theme:`);
  expect(chooseColorText.parent.parent.props.style).toEqual(
    expect.objectContaining({
      backgroundColor: COLORS_LIGHT.appBackground,
    })
  );
  expect(store.getState().theme.isDark).toBeFalsy();
});

