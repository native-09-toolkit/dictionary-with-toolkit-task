import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = /*your code*/

// For correct passing of the tests please, leave these exports as they are
export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;
