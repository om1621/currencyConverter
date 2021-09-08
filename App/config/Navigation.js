import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import OptionsScreen from "../screens/optionsScreen";
import CurrencyList from "../screens/CurrencyList";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const MainStack = createStackNavigator();

// stack navigation for home and setting screen
const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Options"
        component={OptionsScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </MainStack.Navigator>
  );
};

const ModalStack = createStackNavigator();

// stack navigation of modal type for mainstack and currencyList screens
const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <ModalStack.Group screenOptions={{ presentation: "modal" }}>
        <ModalStack.Screen
          name="Currencies"
          component={CurrencyList}
          options={({ navigation, route }) => ({
            headerTitle: route.params && route.params.title,
            headerTitleAlign: "center",
            headerLeft: null,
            headerRight: () => {
              return (
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              );
            },
          })}
        />
      </ModalStack.Group>
    </ModalStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <ModalStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
