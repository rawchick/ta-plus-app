
import React from 'react';
import NewTripScreen from '../screens/NewTripScreen/NewTripScreen';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailScreen from '../screens/DetailScreen/DetailScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import { AsyncStorage } from 'react-native'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {
    createStackNavigator
} from 'react-navigation-stack';
import { Button, Text, Icon, View, Right } from 'native-base'

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }): any => {
                return {
                    title: "HOME"
                }
            }
        },
        Detail: {
            screen: DetailScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#3F51B5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
        },
        navigationOptions: ({ navigation }: any) => {
            let tabBarVisible = true;
            if (navigation.state.index > 0) {
                tabBarVisible = false;
            }

            return {
                tabBarVisible,
            };
        }
    }
);

const NewTripStack = createStackNavigator(
    {
        NewTrip: {
            screen: NewTripScreen
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
        navigationOptions: ({ navigation }: any) => {
            return {
                tabBarVisible: false
            };
        }
    }
);

const SettingStack = createStackNavigator(
    {
        Setting: {
            screen: SettingScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#3F51B5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
)

const AuthStack = createStackNavigator(
    { Signin: LoginScreen },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-home" fontSize={22} style={{ color: tintColor }} />
                ),
            }
        },
        NewTrip: {
            screen: NewTripStack,
            navigationOptions: {
                tabBarLabel: 'New Trip',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-add" fontSize={22} style={{ color: tintColor }} />
                ),
            }
        },
        Setting: {
            screen: SettingStack,
            navigationOptions: {
                tabBarLabel: 'Setting',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-cog" fontSize={22} style={{ color: tintColor }} />
                ),
            }
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        Starter: LoadingScreen,
        App: TabNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'Starter'
    }
));
