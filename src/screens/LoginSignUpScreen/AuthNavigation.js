import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from '../HomeScreen';
import Userprofile from '../Userprofile';
import Productpage from '../Productpage';
import UserCart from '../UserCart';
import Order from '../Order';
import TrackOrder from '../TrackOrder';


const Auth = createStackNavigator();

const AuthNavigation = () => {
  return (
      <Auth.Navigator initialRouteName='SignWelcomeScreen'>
          <Auth.Screen
              name='SignWelcomeScreen'
              component={WelcomeScreen}
              options={{
                    headerShown: false
                }}
          />

          <Auth.Screen
              name='SignInScreen'
              component={LoginScreen}
              options={{
                  headerShown: false
              }}
         />

          <Auth.Screen
              name='SignUpScreen'
              component={SignUpScreen}
              options={{
                  headerShown: false
              }}
          />
          <Auth.Screen
              name='Home'
              component={HomeScreen}
              options={{
                  headerShown: false
              }}
          />
          <Auth.Screen
              name='userprofile'
              component={Userprofile}
              options={{
                  headerShown: false
              }}
          />
          <Auth.Screen
              name='Productpage'
              component={Productpage}
              options={{
                  headerShown: false
              }}
          />
          <Auth.Screen
              name='Cart'
              component={UserCart}
              options={{
                  headerShown: false
              }}
          />
          <Auth.Screen
              name='Order'
              component={Order}
              options={{
                  headerShown: false
              }}
          />

          <Auth.Screen
              name='Track'
              component={TrackOrder}
              options={{
                  headerShown: false
              }}
          />

      </Auth.Navigator>
  )
}

export default AuthNavigation