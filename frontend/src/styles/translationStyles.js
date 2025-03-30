import { StyleSheet } from "react-native";
import { appColors } from './commonStyles'

export const translationStyles = StyleSheet.create({
    container: {
      //flex: 1,
      //justifyContent: 'center',
      backgroundColor: appColors.white,
    },
    translateButtonContainer : 
    {
      marginBottom: 20,
    },
    languageSelector: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
      alignItems: 'center',
      paddingHorizontal : 10,
    },
    translationContainer : 
    {
        
    },
    swapButton: {
      marginHorizontal: 15,
    },
    swapText: {
      fontSize: 30,
      color: appColors.black,
    },
    input: {
      height: 200,
      borderColor: appColors.gray,
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 20,
      padding: 10,
      fontSize: 16,
    },
    recordButtonContainer: {
      marginBottom: 20,
    },
    audioControls: {
      marginTop: 20,
    },
  });
  
  