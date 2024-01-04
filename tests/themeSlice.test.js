import themeSlice from "../store/themeSlice";
import { themeActions } from "../store/themeSlice";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";

test("toggle action changes isDark and  colors from dark to light options", () => {
  const previousState = {
    isDark: true,
    colors: COLORS_DARK,
  };

  expect(themeSlice.reducer(previousState, themeActions.toggle())).toEqual({
    isDark: false,
    colors: COLORS_LIGHT,
  });
});

test("toggle reducer changes isDark and  colors from light to dark options", () => {
  const previousState = {
    isDark: false,
    colors: COLORS_LIGHT,
  };

  expect(themeSlice.reducer(previousState, themeActions.toggle())).toEqual({
    isDark: true,
    colors: COLORS_DARK,
  });
});
