import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import wordsLearningSlice from "./wordsLearningSlice";

const store = configureStore({
  /*create root reducer here with prperty names written below: {
    theme: 
    wordsLearning: 
  }*/
});

export default store;
