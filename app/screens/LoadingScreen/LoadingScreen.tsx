import React from 'react'
import { View, StatusBar, ActivityIndicator, AsyncStorage, StyleSheet, ImageBackground } from 'react-native'

export default class AuthLoadingScreen extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this._bootstrap();
    }

    _bootstrap = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/icons/splash_icon.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <ActivityIndicator />
                    <StatusBar barStyle="default" />
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});