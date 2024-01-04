import { View, StyleSheet, Text, StatusBar, Pressable } from "react-native";
import StatisticsInfo from "../../components/StatisticsInfo";
import ImagePile from "../../components/ImagePile";
import { COLORS_DARK } from "../../constants";

export default function Statistics() {
  return (
    <View style={[styles.container, { backgroundColor: COLORS_DARK.appBackground }]}>
      <StatisticsInfo />
      <ImagePile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
