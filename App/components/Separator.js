import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors";

const styles = StyleSheet.create({
  bottomLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.bottomLine,
  },
});

const Separator = () => {
  return <View style={styles.bottomLine} />;
};

export default Separator;
