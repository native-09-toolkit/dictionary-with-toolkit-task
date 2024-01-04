import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";

import WordCard from "../../components/WordCard";
import { COLORS_DARK } from "../../constants";

export default function Play() {
  const wordsToStudy = [];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  return (
    <View style={styles.container}>
      {wordsToStudy.length === 0 ? (
        <>
          <Text style={[styles.text, { alignSelf: "center" }]}>Congrats!</Text>
          <Text style={styles.text}>For now you have learnt all the words</Text>
          <Image
            style={styles.image}
            source={require("../../assets/well-done-icon.png")}
          />
        </>
      ) : (
        <WordCard
          wordInfo={wordsToStudy[currentWordIndex % wordsToStudy.length]}
          setNext={() =>
            setCurrentWordIndex(
              (currentWordIndex) => (currentWordIndex + 1) % wordsToStudy.length
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_DARK.appBackground,
  },
  text: {
    color: COLORS_DARK.fontMain,
    fontSize: 22,
    margin: 10,
    marginTop: 25,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
