import { View, StyleSheet, Switch, Text } from "react-native";
import { COLORS_DARK } from "../constants";

function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Choose color theme:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.caption}>Light</Text>
        <Switch
          trackColor={{
            false: COLORS_DARK.grey300,
            true: COLORS_DARK.primary300,
          }}
          thumbColor={COLORS_DARK.primary900}
          ios_backgroundColor={COLORS_DARK.primary200}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
        <Text style={styles.caption}>Dark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS_DARK.appBackground,
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  caption: {
    fontSize: 18,
    margin: 30,
    color: COLORS_DARK.fontMain,
  },
});

export default Settings;
