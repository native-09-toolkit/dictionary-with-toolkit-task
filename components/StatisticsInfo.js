import { View, StyleSheet } from "react-native";

import InfoCard from "./InfoCard";

function StatisticsInfo() {
  return (
    <View style={styles.container}>
      <InfoCard
        caption={"To learn"}
        number={10}
        color={true ? "hotpink" : "mediumvioletred"}
      />
      <InfoCard
        caption={"In process"}
        number={5}
        color={true ? "lightgreen" : "green"}
      />
      <InfoCard
        caption={"Learned"}
        number={8}
        color={true ? "lightblue" : "mediumblue"}
      />
    </View>
  );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "20%",
  },
});
