import React, { useContext } from "react";
import { FlatList, SafeAreaView, ActivityIndicator, View } from "react-native";
import Option from "../components/Option";
import Currencies from "../data/currencies.json";
import Separator from "../components/Separator";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { ConversionContext } from "../../App/utils/ConversionContext";

const CurrencyList = ({ navigation, route }) => {
  const [currencies, setCurrencies] = React.useState(Currencies);
  const [isLoading, setIsLoading] = React.useState(true);

  const { mainCurrency, setMainCurrency, quoteCurrency, setQuoteCurrency } =
    useContext(ConversionContext);

  useFocusEffect(
    React.useCallback(() => {
      const getCurrencies = async () => {
        const res = await axios.get(
          `http://data.fixer.io/api/latest?access_key=8bec7537d553eba88ce32d413cb117c3`
        );
        setCurrencies(Object.keys(res.data.rates));
        setIsLoading(false);
      };

      getCurrencies();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={50} color={Colors.text} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          let selected = route.params.isMainCurrency
            ? mainCurrency === item
            : quoteCurrency === item;

          return (
            <Option
              text={item}
              onPress={() => {
                if (route.params.isMainCurrency) {
                  setMainCurrency(item);
                } else {
                  setQuoteCurrency(item);
                }
                navigation.goBack();
              }}
              rightIcon={
                selected && (
                  <AntDesign name="checkcircle" size={24} color={Colors.blue} />
                )
              }
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
};

export default CurrencyList;
