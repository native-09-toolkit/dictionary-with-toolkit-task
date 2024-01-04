import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import Item from "../../components/ListItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS_DARK } from "../../constants";

function AllWords({ navigation }) {
  const words = [];

  return (
    <>
      <Pressable
        style={styles.addPressable}
        onPress={() => navigation.navigate("AddWord")}
      >
        <Ionicons
          name="add-outline"
          size={46}
          color={COLORS_DARK.fontInverse}
        />
      </Pressable>
      <View style={{ flex: 2 }}>
        <FlatList
          data={words}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.word}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.textEmpty}>No words yet</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/study(option3).png")}
              />
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    zIndex: 10,
  },
  addPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: 200,
    right: "10%",
    backgroundColor: COLORS_DARK.primary900,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
  image: {
    width: "55%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  empty: {
    height: 300,
    backgroundColor: COLORS_DARK.fontInverse,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textEmpty: {
    fontSize: 40,
    color: COLORS_DARK.primary200,
  },
});

export default AllWords;
