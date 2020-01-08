import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage,
    Platform,
    Image,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import { Container, Content, Text, Button } from 'native-base'
import { Icon } from 'react-native-elements'
import AzureAuth from 'react-native-azure-auth';
import LoginScreenAction from './LoginScreenAction';

const CLIENT_ID = 'd69a32fd-07ff-4576-84ca-9986f6a9c75e' // replace the string with YOUR client ID
const TENANT_ID = 'bbb8da8f-f374-490f-9190-2242176e117c' // replace the string with YOUR tenant ID
const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
    redirectUri: Platform.OS === 'ios' ? "com.reactntstarter://com.reactntstarter/ios/callback" : "azure://com.reactntstarter/android/callback",
    authorityUrl: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}`
});

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    LoginScreenState: reduxState.LoginScreenState
})

class LoginScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {

    }

    _onLogin = async () => {
        try {
            let tokens = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read' })
            let info = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: 'me' })
            let accessTokens = await azureAuth.auth.acquireTokenSilent({ scope: 'api://ebb86a39-32dd-426f-a28a-45d2d9e5d302/TA.ADMIN', userId: tokens.userId })
            if (!accessTokens) {
                // No cached tokens or the requested scope defines new not yet consented permissions
                // Open a window for user interaction
                accessTokens = await azureAuth.webAuth.authorize({ scope: 'api://ebb86a39-32dd-426f-a28a-45d2d9e5d302/TA.ADMIN' })
            } 
            this.props.signIn(tokens, accessTokens, info)
            this.props.navigation.navigate('Starter');
        } catch (error) {
            console.log('Error during Azure operation', error)
        }
    };

    _onLogout = () => {
        this.props.signOut()
    };

    render() {
        return (
            <>
                <View style={{ flex: 2 }}>
                    <Image source={{ uri: 'https://lh3.googleusercontent.com/-K9Eo6yuTfpM/Xg7bnriBcEI/AAAAAAAAAJY/p11mimqlPxsoa27QaAfXoSs4DmPVB6S1wCK8BGAsYHg/s0/1-01.png' }}
                        style={{
                            flex: 1,
                            height: undefined,
                            width: '100%',
                            resizeMode: 'stretch'
                        }}>
                    </Image>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: undefined, height: '100%', aspectRatio: 1 }}
                        source={{ uri: 'https://lh3.googleusercontent.com/-xv-5w6TW3t4/Xg7bp5oRL-I/AAAAAAAAAJk/e2HtX2F4FBcR9OrGV0x0uHxzS5cF3lFvwCK8BGAsYHg/s0/1-02.png' }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={this._onLogin} underlayColor="white">
                        <View
                            style={styles.buttons}
                        >
                            <Text style={styles.buttonText}>Banpu</Text>
                            <Text style={styles.buttonText}>SignIn</Text>
                            <Icon size={70} name="md-key" color="#fff" type="ionicon" />
                        </View>
                    </TouchableHighlight>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        textAlign: 'center',
        margin: 5
    },
    subHeader: {
        textAlign: 'center',
        marginBottom: 30
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22
    },
    buttons: {
        height: 140,
        width: 140,
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: 20,
        backgroundColor: '#1C7CD5',
        borderRadius: 100
    },
    button: {
        flex: 1,
        padding: 20,
        margin: 20
    },
    list: {
        flex: 5,
        margin: 20
    }
});

export default connect(mapStateToProps, { ...LoginScreenAction })(LoginScreen);