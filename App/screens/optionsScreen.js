import React from "react";
import { SafeAreaView, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import Option from "../components/Option";
import Separator from "../components/Separator";

const OptionsScreen = () => {
  return (
    <SafeAreaView>
      <Option
        text="Themes"
        rightIcon={<Fontisto name="angle-right" size={14} color="blue" />}
      />
      <Separator />
      <Option
        text="React Native Basics"
        rightIcon={<Fontisto name="export" size={14} color="blue" />}
      />
      <Separator />
      <Option
        text="React Native By Example"
        rightIcon={<Fontisto name="export" size={14} color="blue" />}
      />
    </SafeAreaView>
  );
};

export default OptionsScreen;
