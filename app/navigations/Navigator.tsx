
import React from 'react';
import NewTripScreen from '../screens/NewTripScreen/NewTripScreen';
import LandingNewTripScreen from '../screens/LandingNewTripScreen/LandingNewTripScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import PinCodeScreen from '../screens/PinCodeScreen/PinCodeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TripDetailScreen from '../screens/TripDetailScreen/TripDetailScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import NonBanpuFormScreen from '../screens/NonBanpuFormScreen/NonBanpuFormScreen'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements'

import { Icon as NBIcon } from 'native-base'

const NewTripFormStack = createStackNavigator(
    {
        NewTrip: {
            screen: NewTripScreen
        },
        Search: {
            screen: SearchScreen,
            navigationOptions: ({ navigation }): any => {
                const { params } = navigation.state
                return {
                    title: `Search ${params}`
                }
            }
        }
    },
    {
        mode: 'modal',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#232127',
        },
        navigationOptions: ({ navigation }: any) => {
            return {
                tabBarVisible: false,
            };
        }
    }
);

const tripDetailStack = createStackNavigator(
    {
        TripDetail: {
            screen: TripDetailScreen
        },
        TripDetailSearchScreen: {
            screen: SearchScreen,
            navigationOptions: ({ navigation }): any => {
                return {
                    title: "Search " + navigation.state.params.searchType
                }
            }
        },
        NonBanpuFrom: {
            screen: NonBanpuFormScreen
        }
    }
)

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            params: { mode: 'scheduled' }
        },
        TripDetail: {
            screen: tripDetailStack,
            navigationOptions: ({ navigation }): any => {
                return {
                    header: null
                }
            }
        },
        NewTrip: {
            screen: NewTripFormStack,
            navigationOptions: { header: null },
        }
    },
    {
        mode: "modal",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#232127',
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
                tabBarVisible
            };
        }
    }
);

const NewTripStack = createStackNavigator(
    {
        LandingNewTrip: {
            screen: LandingNewTripScreen,
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
        defaultNavigationOptions: {
            headerTintColor: 'black'
        },
        navigationOptions: ({ navigation }: any) => {
            return {
                tabBarVisible: false,
            };
        }
    }
)

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
    {
        Signin: LoginScreen,
        PinCode: PinCodeScreen
    },
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
                tabBarLabel: 'My Trip',
                tabBarIcon: ({ tintColor }) => (
                    <NBIcon name="briefcase" fontSize={22} style={{ color: tintColor }} />
                ),
            }
        },
        LandingNewTrip: {
            screen: NewTripStack,
            navigationOptions: {
                tabBarLabel: 'New Trip',
                tabBarIcon: ({ tintColor }) => (
                    <NBIcon name="ios-add-circle-outline" fontSize={22} style={{ color: tintColor }} />
                )
            }
        },
        Setting: {
            screen: SettingStack,
            navigationOptions: {
                tabBarLabel: 'Setting',
                tabBarIcon: ({ tintColor }) => (
                    <NBIcon name="ios-cog" fontSize={22} style={{ color: tintColor }} />
                ),
            }
        }
    },
    {
        tabBarOptions: {
            showIcon: true,
            showLabel: true,
            activeTintColor: '#064ACB',
            inactiveTintColor: '#707070',
            style: {
                backgroundColor: '#F4F4F6',
                width: '100%',
                height: 70
            },
            tabStyle: {
                padding: 10,
            },
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        defaultNavigationOptions: {
            // other tab navigation options...
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                if (navigation.state.key === 'LandingNewTrip') {
                    navigation.navigate('NewTrip');
                } else {
                    defaultHandler();
                }
            }
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        Starter: SplashScreen,
        App: TabNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'Starter'
    }
));
