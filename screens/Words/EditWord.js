import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { playSound } from "../../services/soundHandler";
import { COLORS_DARK } from "../../constants";
import { wordsLearningActions } from "../../store/wordsLearningSlice";

function EditWord({ route, navigation }) {
  const [wordData, setWordData] = useState(() => route.params.wordData);
  const dispatch = useDispatch();

  function onSave() {
    dispatch(
      wordsLearningActions.updateWord({
        word: wordData.word,
        phonetics: wordData.phonetics,
        audio: wordData.audio,
        meaning: wordData.meaning,
        partOfSpeech: wordData.partOfSpeech,
      })
    );

    navigation.navigate("AllWords");
  }

  function onChangeWordData(text, propName) {
    setWordData((prevData) => ({
      ...prevData,
      [propName]: text,
    }));
  }

  return (
    <>
      <Image
        style={styles.image}
        source={require("../../assets/edit-koala.png")}
      />

      <View style={styles.receivedInfoContainer}>
        <View style={styles.wordContainer}>
          <Text style={styles.word}>{wordData.word}</Text>

          {wordData.audio && (
            <Pressable
              style={styles.playPressable}
              onPress={() => playSound(wordData.audio)}
            >
              <Ionicons
                name="volume-medium-outline"
                size={28}
                color={COLORS_DARK.primary900}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.row}>
          <View style={styles.inputColumn}>
            <Text style={styles.label}>phonetics:</Text>
            <TextInput
              value={wordData.phonetics ?? ""}
              style={styles.input}
              onChangeText={(text) =>
                onChangeWordData(text, "phonetics")
              }
            />
          </View>

          <View style={styles.inputColumn}>
            <Text style={styles.label}>part of speach:</Text>
            <TextInput
              style={styles.input}
              value={wordData.partOfSpeech ?? ""}
              onChangeText={(text) =>
                onChangeWordData(text, "partOfSpeech")
              }
            />
          </View>
        </View>

        <Text style={styles.label}>meaning:</Text>

        <TextInput
          style={[styles.input, styles.meaningInput]}
          multiline
          numberOfLines={4}
          onChangeText={(text) => onChangeWordData(text, "meaning")}
          value={wordData.meaning ?? ""}
          textAlignVertical="top"
        />

        {!!wordData.word && (
          <Pressable
            style={styles.buttonContainer}
            onPress={onSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "40%",
    marginTop: 80,
    marginBottom: 20,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  inputColumn: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    borderColor: COLORS_DARK.primary200,
    color: COLORS_DARK.fontMain,
  },
  meaningInput: {
    minHeight: 90,
  },
  label: {
    fontSize: 12,
    color: COLORS_DARK.grey600,
    marginBottom: 4,
    paddingTop: 10,
  },
  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  word: {
    fontSize: 32,
    paddingHorizontal: 10,
    color: COLORS_DARK.fontMain,
  },
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: COLORS_DARK.primary900,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  buttonText: {
    fontSize: 24,
    color: COLORS_DARK.fontInverse,
  },
  playPressable: {
    marginHorizontal: 20,
  },
});

export default EditWord;