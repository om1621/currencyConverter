import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const styles = StyleSheet.create({
  row: {
    marginLeft: 20,
    marginRight: 10,
    paddingVertical: 15,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowContent: {
    fontSize: 16,
    color: Colors.text,
  },
});

const Option = ({ text, rightIcon, ...props }) => {
  return (
    <TouchableOpacity {...props} style={styles.row}>
      <Text style={styles.rowContent}>{text}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

export default Option;
