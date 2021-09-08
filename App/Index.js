import React from "react";
import Navigation from "./config/Navigation";
import { ConversionContextProvider } from "../App/utils/ConversionContext";

export default function App() {
  return (
    <ConversionContextProvider>
      <Navigation />
    </ConversionContextProvider>
  );
}
