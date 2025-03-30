import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function SelectLanguage({ language, onLanguageChange }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Picker
        selectedValue={language}
        style={{ height: 60, width: 150 }}
        onValueChange={(itemValue) => onLanguageChange(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Français" value="fr" /> vs
      </Picker>
    </View>
  );
}
