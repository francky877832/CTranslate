import React from 'react';
import { View, Text, homeStylesheet, ScrollView } from 'react-native';
import Translation from './Translation';
import { homeStyles } from '../../styles/homeStyles';
export default function Home() {
  return (
    <View style={homeStyles.container}>
     {/*<Text style={homeStyles.header}>Welcome to the Translation App</Text>*/}
      <Translation />
    </View>
  );
}

