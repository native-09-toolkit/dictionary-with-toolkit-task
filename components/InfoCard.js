import { View, StyleSheet, Text } from "react-native";
import { COLORS_DARK } from "../constants";

function InfoCard({ color, caption, number }) {
  return (
    <View
      style={[
        styles.container,
        { borderColor: color, backgroundColor: COLORS_DARK.fontInverse },
      ]}
    >
      <Text style={[styles.number, { color: color }]}>{number}</Text>
      <Text style={[styles.caption, { color: color }]}>{caption}</Text>
    </View>
  );
}

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    elevation: 3,
    borderWidth: 0.3,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  caption: {
    opacity: 1,
    fontSize: 18,
    fontWeight: "300",
  },
  number: {
    fontSize: 22,
    fontWeight: "800",
  },
});
