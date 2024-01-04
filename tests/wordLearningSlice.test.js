import wordsLearningSlice, {
  wordsLearningActions,
} from "../store/wordsLearningSlice";
import wordsData from "./testData";
import * as constants from "../constants";

const day = Math.floor(Math.random() * 30) + 1;
const year = Math.floor(Math.random() * 24) + 2000;

constants.INITIAL_FORGETTING_SPAN = 500;

function mockNow() {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(`${day} Oct ${year}  23:24:00`));
}

afterEach(() => {
  jest.useRealTimers();
});

beforeEach(() => {
  mockNow();
});

test("addWord reducer adds word to empty words array", () => {
  const previousState = {
    words: [],
  };
  const wordPayload = wordsData[0];
  expect(
    wordsLearningSlice.reducer(
      previousState,
      wordsLearningActions.addWord(wordPayload)
    ).words[0]
  ).toMatchObject(wordPayload);
});

test("addWord reducer adds word to not empty words array", () => {
  const initialWord = { ...wordsData[0], status: 0 };
  const previousState = {
    words: [initialWord],
  };
  const wordPayload = { ...wordsData[1], status: 0 };
  expect(
    wordsLearningSlice
      .reducer(previousState, wordsLearningActions.addWord(wordPayload))
      .words.find((el) => el.word === wordPayload.word)
  ).toMatchObject(wordPayload);
});

test("addWord reducer does not add a word if the word already exists in the words array", () => {
  const initialWord = { ...wordsData[0], status: 0 };
  const previousState = {
    words: [initialWord],
  };
  const wordPayload = { ...initialWord };
  expect(
    wordsLearningSlice.reducer(
      previousState,
      wordsLearningActions.addWord(wordPayload)
    ).words
  ).toHaveLength(1);
});

test("updateWord reducer updates a word", () => {
  const initialWords = [
    { ...wordsData[0], status: 0 },
    { ...wordsData[1], status: 0 },
  ];
  const previousState = {
    words: initialWords,
  };
  const wordPayload = { ...initialWords[0] };
  wordPayload.meaning = "new meaning";
  wordPayload.partOfSpeech = "exclamation";

  expect(
    wordsLearningSlice.reducer(
      previousState,
      wordsLearningActions.updateWord(wordPayload)
    ).words[0]
  ).toMatchObject(wordPayload);
});

test("addWord sets correct additional data", () => {
  const previousState = {
    words: [],
  };
  const wordPayload = wordsData[0];

  const addedWordInfo = wordsLearningSlice.reducer(
    previousState,
    wordsLearningActions.addWord(wordPayload)
  ).words[0];

  expect(addedWordInfo.status).toBe(0);
  expect(addedWordInfo.forgettingSpan).toBe(constants.INITIAL_FORGETTING_SPAN);
  expect(addedWordInfo.dateTotallyForgets).toBe(new Date().getTime());
  expect(addedWordInfo.dateForgets).toBe(
    new Date().getTime() - constants.INITIAL_FORGETTING_SPAN
  );
});

test("updateWordLearnInfo sets correct additional data", () => {
  const previousState = {
    words: [
      {
        word: "hello",
        phonetics: "həˈləʊ",
        audio:
          "https://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
        meaning: "used as a greeting or to begin a phone conversation.",
        status: 0,
        dateForgets: new Date().getTime() - constants.INITIAL_FORGETTING_SPAN,
        dateTotallyForgets: new Date().getTime(),
        forgettingSpan: constants.INITIAL_FORGETTING_SPAN,
      },
    ],
  };
  const updatedWordInfo = wordsLearningSlice.reducer(
    previousState,
    wordsLearningActions.updateWordLearnInfo("hello")
  ).words[0];

  expect(updatedWordInfo.status).toBe(2);
  const newWordForgettingSpan = constants.INITIAL_FORGETTING_SPAN * 2;
  expect(updatedWordInfo.forgettingSpan).toBe(newWordForgettingSpan);
  expect(updatedWordInfo.dateForgets).toBe(
    new Date().getTime() + constants.INITIAL_FORGETTING_SPAN
  );
  expect(updatedWordInfo.dateTotallyForgets).toBe(
    new Date().getTime() + newWordForgettingSpan
  );
});

test("words have their status changed when time comes, with updateStatuses reducer", () => {
  const wordForgettingSpan = constants.INITIAL_FORGETTING_SPAN * 2;
  const previousState = {
    words: [
      {
        word: "hello",
        phonetics: "həˈləʊ",
        audio:
          "https://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
        meaning: "used as a greeting or to begin a phone conversation.",
        status: 0,
        dateForgets: new Date().getTime() + wordForgettingSpan,
        dateTotallyForgets: new Date().getTime() + wordForgettingSpan * 2,
        forgettingSpan: wordForgettingSpan,
      },
    ],
  };
  const updatedWordInfo = wordsLearningSlice.reducer(
    previousState,
    wordsLearningActions.updateWordLearnInfo("hello")
  ).words[0];

  expect(updatedWordInfo.status).toBe(2);
  const newWordForgettingSpan = wordForgettingSpan * 2;
  expect(updatedWordInfo.forgettingSpan).toBe(newWordForgettingSpan);
  expect(updatedWordInfo.dateForgets).toBe(
    new Date().getTime() + wordForgettingSpan
  );
  expect(updatedWordInfo.dateTotallyForgets).toBe(
    new Date().getTime() + newWordForgettingSpan
  );
  jest.advanceTimersByTime(wordForgettingSpan + 5);
  expect(
    wordsLearningSlice.reducer(
      { words: [updatedWordInfo] },
      wordsLearningActions.updateStatuses()
    ).words[0].status
  ).toBe(1);
  jest.advanceTimersByTime(wordForgettingSpan + 5);
  expect(
    wordsLearningSlice.reducer(
      { words: [updatedWordInfo] },
      wordsLearningActions.updateStatuses()
    ).words[0].status
  ).toBe(0);
});
