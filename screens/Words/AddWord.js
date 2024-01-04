import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

import { getWordInfo } from "../../services/wordsHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../../services/soundHandler";
import { COLORS_DARK } from "../../constants";

function AddWord({ navigation }) {
  const [text, setText] = useState();
  const [wordData, setWordData] = useState();

  function onChangeText(text) {
    setWordData(undefined);
    setText(text);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (text) {
        const wordDataReceived = await getWordInfo(text);
        setWordData(wordDataReceived);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  useEffect(() => {
    navigation.setOptions({
      title: wordData?.word ? `Adding word "${wordData.word}"` : `Adding word`,
    });
  }, [navigation, wordData]);

  function onAdd() {
    navigation.navigate(
      "AllWords"
    );
  }

  return (
    <>
      <Image
        style={{
          marginTop: 80,
          marginBottom: 20,
          width: "40%",
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../../assets/add-koala.png")}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your word to search:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="type here.."
          placeholderTextColor={COLORS_DARK.grey600}
        />
      </View>
      {wordData && (
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
            <Text style={styles.phonetics}>{wordData.phonetics}</Text>
          </View>
          <Text style={styles.partOfSpeech}>{wordData.partOfSpeech}</Text>
          <Text style={styles.meaning}>{wordData.meaning}</Text>
          {wordData.word && (
            <Pressable style={styles.buttonContainer} onPress={onAdd}>
              <Text style={{ fontSize: 24, color: COLORS_DARK.fontInverse }}>
                Add
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      fontSize: 18,
      borderColor: COLORS_DARK.primary200,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      color: COLORS_DARK.fontMain,
    },
    label: {
      fontSize: 12,
      color: COLORS_DARK.grey600,
      marginBottom: 4,
    },
    inputContainer: {
      marginHorizontal: 12,
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
      color: COLORS_DARK.fontMain,
    },
    partOfSpeech: {
      fontSize: 20,
      paddingHorizontal: 10,
      color: COLORS_DARK.fontMain,
    },
    meaning: {
      fontSize: 16,
      padding: 13,
      color: COLORS_DARK.fontMain,
    },
    buttonContainer: {
      borderRadius: 4,
      backgroundColor: COLORS_DARK.primary900,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
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

export default AddWord;
