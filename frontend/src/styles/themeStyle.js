import {StyleSheet, Platform, Dimensions } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { appColors } from "./commonStyles";

export const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: appColors.white,
      text: appColors.black,
    },
  };
  
  export const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: appColors.black,
      text: appColors.white,
    },
  };
  