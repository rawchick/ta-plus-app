import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'native-base';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';

export const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" fontSize={22} style={{ color: tintColor }} />
            ),
        }
    },
    Settings: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon name="ios-settings" fontSize={22} style={{ color: tintColor }} />
                )
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: '#3F51B5',
        inactiveTintColor: 'grey',
        showIcon: true
    }
});