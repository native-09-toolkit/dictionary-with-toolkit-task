import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { playSound } from "../services/soundHandler";
import { COLORS_DARK } from "../constants";
import { wordsLearningActions } from "../store/wordsLearningSlice";

function Item({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const iconName =
    item.status === 0
      ? "battery-dead-sharp"
      : item.status === 1
      ? "battery-half-sharp"
      : "battery-full-sharp";

  function onDelete() {
    dispatch(wordsLearningActions.removeWord(item.word));
  }

  return (
    <View style={styles.item}>
      <Pressable
        disabled={!item.audio}
        onPress={() => playSound(item.audio)}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="play-outline"
            size={28}
            color={
              !item.audio
                ? COLORS_DARK.grey300
                : COLORS_DARK.primary900
            }
          />
        </View>
      </Pressable>

      <Pressable
        style={styles.textContainer}
        onPress={() =>
          navigation.navigate("EditWord", {
            wordData: item,
          })
        }
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.word}</Text>
          <Ionicons
            name={iconName}
            size={18}
            color={COLORS_DARK.primary900}
          />
        </View>

        <Text style={styles.definition}>{item.meaning}</Text>
      </Pressable>

      <Pressable
        style={styles.iconContainer}
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.word}`}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={COLORS_DARK.secondary800}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS_DARK.fontInverse,
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 5,
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 8,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS_DARK.fontMain,
    paddingRight: 20,
  },
  definition: {
    fontSize: 16,
    color: COLORS_DARK.fontMain,
  },
  iconContainer: {
    padding: 3,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 5,
  },
});

export default Item;