import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import Input from "../components/Input";
import colors from "../constants/colors";
import { format } from "date-fns";
import { Fontisto } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { ConversionContext } from "./../utils/ConversionContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  logoBackground: {
    width: screen.width * 0.35,
    height: screen.height * 0.35,
  },
  logoImage: {
    position: "absolute",
    width: screen.width * 0.2,
    height: screen.height * 0.2,
  },
  inputContainer: {
    flex: 1,
  },
  textHeader: {
    textAlign: "center",
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: -45,
  },
  textSubHeader: {
    textAlign: "center",
    color: colors.white,
    fontSize: 12,
  },
  reverseButton: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  reverseButtonImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  reverseButtonText: {
    color: colors.white,
  },
  settingButton: {
    position: "absolute",
    right: 25,
    top: 30,
  },
});

export default function HomeScreen({ navigation }) {
  const currentDate = format(new Date(), " d MMMM yyyy");

  const {
    mainCurrency,
    setMainCurrency,
    mainCurrencyValue,
    setMainCurrencyValue,
    quoteCurrency,
    setQuoteCurrency,
    quoteCurrencyValue,
    setQuoteCurrencyValue,
    exchangeRate,
    setExchangeRate,
    reverseCurrencies,
  } = useContext(ConversionContext);

  useFocusEffect(
    React.useCallback(() => {
      const getExchangeRates = async () => {
        const res = await axios.get(
          `http://data.fixer.io/api/latest?access_key=8bec7537d553eba88ce32d413cb117c3&symbols=${quoteCurrency},${mainCurrency}`
        );

        let curr = Object.values(res.data.rates);
        let tempExchangeRate = (curr[0] / curr[1]).toFixed(6);
        setExchangeRate(tempExchangeRate);
        setQuoteCurrencyValue(
          (tempExchangeRate * parseFloat(mainCurrencyValue)).toFixed(2)
        );
      };

      getExchangeRates();
    }, [mainCurrency, quoteCurrency])
  );

  return (
    <View style={styles.container}>
      {/* status bars */}
      <StatusBar barStyle="light-content" />

      {/* button for navigation to setting screen */}
      <View style={styles.settingButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Options")}>
          <Fontisto name="player-settings" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Logo part */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/background.png")}
          style={styles.logoBackground}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Homepage heading */}
      <Text style={styles.textHeader}>Currency Converter</Text>

      {/* mainCurrency Input component */}
      <Input
        text={mainCurrency}
        value={mainCurrencyValue}
        onButtonPress={() =>
          navigation.navigate("Currencies", {
            title: "Base Currencies",
            isMainCurrency: true,
          })
        }
        onChangeText={(val) => {
          setMainCurrencyValue(val);
          setQuoteCurrencyValue((exchangeRate * parseFloat(val)).toFixed(2));
        }}
        keyboardType="numeric"
      />

      {/* quoteCurrency showing component */}
      <Input
        text={quoteCurrency}
        value={quoteCurrencyValue}
        editable={false}
        onButtonPress={() =>
          navigation.navigate("Currencies", {
            title: "Quote Currencies",
            isMainCurrency: false,
          })
        }
      />

      {/* Homepage subheader */}
      <Text style={styles.textSubHeader}>
        {`1 ${mainCurrency} = ${exchangeRate} ${quoteCurrency} as of ${currentDate}`}
      </Text>

      {/* Button to switch main and quoteCurrency */}
      <TouchableOpacity
        onPress={reverseCurrencies}
        style={styles.reverseButton}
      >
        <Image
          source={require("../assets/images/reverse.png")}
          resizeMode="contain"
          style={styles.reverseButtonImage}
        />
        <Text style={styles.reverseButtonText}>Reverse Currencies</Text>
      </TouchableOpacity>
    </View>
  );
}
