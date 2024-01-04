import { createDrawerNavigator } from "@react-navigation/drawer";

import Statistics from "../screens/Learning/Statistics";
import Play from "../screens/Learning/Play";
import { COLORS_DARK } from "../constants";

const Drawer = createDrawerNavigator();

function LearningNavigation() {

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: "800" },
        headerTintColor: COLORS_DARK.primary900,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: COLORS_DARK.appBackground,
        },
        drawerStyle: {
          backgroundColor: COLORS_DARK.primary200,
          width: 140,
          height: 130,
          borderBottomRightRadius: 20,
        },
        drawerInactiveTintColor: COLORS_DARK.fontMain,
        drawerActiveTintColor: COLORS_DARK.primary100,
        drawerActiveBackgroundColor: COLORS_DARK.primary300,
        contentStyle: { backgroundColor: COLORS_DARK.appBackground },
      }}
    >
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="Play" component={Play} />
    </Drawer.Navigator>
  );
}

export default LearningNavigation;
