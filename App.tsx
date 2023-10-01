/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WelcomeScreen from './src/screens/LoginSignUpScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignUpScreen/LoginScreen';
import SignUpScreen from './src/screens/LoginSignUpScreen/SignUpScreen';
import RootNavigation from './src/screens/RootNavigation';
import { colors } from './src/globals/styles';

const App = () => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'}
      backgroundColor={colors.primary_key}/>
      <RootNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;
