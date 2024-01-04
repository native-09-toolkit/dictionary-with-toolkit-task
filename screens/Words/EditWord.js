import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../../services/soundHandler";
import { useState } from "react";
import { COLORS_DARK } from "../../constants";

function EditWord({ route, navigation }) {
  const [wordData, setWordData] = useState(() => route.params.wordData);

  function onSave() {
    navigation.navigate("AllWords");
  }

  function onChangeWordData(text, propName) {
    setWordData((prevData) => ({ ...prevData, [propName]: text }));
  }

  return (
    <>
      <Image
        style={{
          width: "40%",
          marginTop: 80,
          marginBottom: 20,
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../../assets/edit-koala.png")}
      />

      <View style={styles.receivedInfoContainer}>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
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
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>phonetics:</Text>
            <TextInput
              value={wordData.phonetics}
              style={styles.input}
              onChangeText={(text) => onChangeWordData(text, "phonetics")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>part of speach:</Text>
            <TextInput
              style={styles.input}
              value={wordData.partOfSpeech}
              onChangeText={(text) => onChangeWordData(text, "partOfSpeech")}
            />
          </View>
        </View>
        <Text style={styles.label}>meaning:</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          onChangeText={(text) => onChangeWordData(text, "meaning")}
          value={wordData.meaning}
          textAlignVertical={"top"}
        />
        {wordData.word && (
          <Pressable style={styles.buttonContainer} onPress={onSave}>
            <Text style={{ fontSize: 24, color: COLORS_DARK.fontInverse }}>
              Save
            </Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    borderColor: COLORS_DARK.primary200,
    color: COLORS_DARK.fontMain,
  },
  label: {
    fontSize: 12,
    color: COLORS_DARK.grey600,
    marginBottom: 4,
    paddingTop: 10,
  },
  inputContainer: {
    margin: 12,
  },
  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 32,
  },
  word: {
    fontSize: 32,
    paddingHorizontal: 10,
    color: COLORS_DARK.fontMain,
  },
  phonetics: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  partOfSpeech: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  meaning: {
    fontSize: 16,
    padding: 13,
  },
  buttonContainer: {
    borderRadius: 4,
    backgroundColor: COLORS_DARK.primary900,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  backPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: "2%",
    left: "2%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  playPressable: {
    marginHorizontal: 20,
  },
});

export default EditWord;
