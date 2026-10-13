import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_FORGETTING_SPAN } from "../constants";

const initialState = {
  words: [],
};

const wordsLearningSlice = createSlice({
  name: "wordsLearning",
  initialState,
  reducers: {
    addWord: (state, action) => {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;

      const existingWord = state.words.find((item) => item.word === word);

      if (!existingWord) {
        const now = new Date().getTime();

        state.words.push({
          word,
          phonetics,
          audio,
          meaning,
          partOfSpeech,
          status: 0,
          forgettingSpan: INITIAL_FORGETTING_SPAN,
          dateForgets: now - INITIAL_FORGETTING_SPAN,
          dateTotallyForgets: now,
        });
      }
    },

    updateWord: (state, action) => {
      const { word, phonetics, audio, meaning, partOfSpeech } = action.payload;

      const wordObj = state.words.find((item) => item.word === word);

      if (wordObj) {
        if (phonetics !== undefined) wordObj.phonetics = phonetics;
        if (audio !== undefined) wordObj.audio = audio;
        if (meaning !== undefined) wordObj.meaning = meaning;
        if (partOfSpeech !== undefined) wordObj.partOfSpeech = partOfSpeech;
      }
    },

    removeWord: (state, action) => {
      state.words = state.words.filter(
        (item) => item.word !== action.payload
      );
    },

    updateWordLearnInfo: (state, action) => {
      const wordObj = state.words.find(
        (item) => item.word === action.payload
      );

      if (wordObj) {
        const now = new Date().getTime();
        const oldForgettingSpan = wordObj.forgettingSpan;

        wordObj.dateForgets = now + oldForgettingSpan;
        wordObj.dateTotallyForgets = now + oldForgettingSpan * 2;
        wordObj.forgettingSpan = oldForgettingSpan * 2;
        wordObj.status = 2;
      }
    },

    updateStatuses: (state) => {
      const now = new Date().getTime();

      state.words.forEach((word) => {
        if (now > word.dateTotallyForgets) {
          word.status = 0;
        } else if (now >= word.dateForgets) {
          word.status = 1;
        } else {
          word.status = 2;
        }
      });
    },
  },
});

export const wordsLearningActions = wordsLearningSlice.actions;

export default wordsLearningSlice;