import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  InputContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  currencyButton: {
    borderRightColor: colors.bottomLine,
    borderRightWidth: 1,
    color: colors.text,
    backgroundColor: colors.white,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  buttonText: {
    padding: 10,
    fontSize: 15,
    width: 60,
    textAlign: "center",
  },
  currencyInput: {
    flex: 1,
    paddingHorizontal: 10,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  blockedInput: {
    backgroundColor: colors.lightWhite,
  },
});

const Input = ({ text, onButtonPress, ...props }) => {
  let containerStyle = [styles.InputContainer];

  if (props.editable === false) {
    containerStyle = [...containerStyle, styles.blockedInput];
  }

  return (
    <View style={containerStyle}>
      {/* Button to select currency */}
      <TouchableOpacity onPress={onButtonPress} style={styles.currencyButton}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>

      {/* component to show/takeInput currency Value */}
      <TextInput style={styles.currencyInput} {...props} />
    </View>
  );
};

export default Input;
