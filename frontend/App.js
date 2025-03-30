import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { TranslationProvider } from './src/context/TranslationContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <TranslationProvider>
        <DrawerNavigator />
      </TranslationProvider>
    </SafeAreaProvider>
  );
}
