import React from 'react'
import { connect } from 'react-redux';
import { View, StatusBar, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import AzureAuth from 'react-native-azure-auth';
import LoginScreenAction from '../LoginScreen/LoginScreenAction'

const CLIENT_ID = 'd69a32fd-07ff-4576-84ca-9986f6a9c75e' // replace the string with YOUR client ID
const TENANT_ID = 'bbb8da8f-f374-490f-9190-2242176e117c' // replace the string with YOUR tenant ID
const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
    redirectUri: Platform.OS === 'ios' ? "com.reactntstarter://com.reactntstarter/ios/callback" : "azure://com.reactntstarter/android/callback",
    authorityUrl: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}`
});

const mapStateToProps = (reduxState: any) => ({
    ...reduxState
})

class AuthLoadingScreen extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this._bootstrap();
    }

    _bootstrap = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken')
        if (accessToken) {
            this.props.navigation.navigate('PinCode');
        } else {
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/icons/splash_icon.png')} style={{ width: 200, height: 200 }}>
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

export default connect(mapStateToProps, { ...LoginScreenAction })(AuthLoadingScreen);