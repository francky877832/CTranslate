import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Import des composants (pages)
import Home from '../components/pages/Home';
//import SettingsScreen from '../components/SettingsScreen';
import UserLogin from '../components/pages/UserLogin';
import UserRegister from '../components/pages/UserRegister';
import UserProfile from '../components/pages/UserProfile';
import History from '../components/pages/History';

// Import du thème
import { darkTheme, lightTheme } from '../styles/themeStyle';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [theme, setTheme] = useState('light');

  return (
    <NavigationContainer theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Change Theme"
              onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </DrawerContentScrollView>
        )}
      >
        {/* Définir les écrans du Drawer         <Drawer.Screen name="Settings" component={Settings} />
  */}
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="Profile" component={UserProfile} />
        <Drawer.Screen name="Login" component={UserLogin} />
        <Drawer.Screen name="Register" component={UserRegister} />
       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
