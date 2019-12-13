import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage,
    Platform
} from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import { Container, Content, H1, Text, Button } from 'native-base'
import AzureAuth from 'react-native-azure-auth';

const CLIENT_ID = 'd69a32fd-07ff-4576-84ca-9986f6a9c75e' // replace the string with YOUR client ID
const TENANT_ID = 'bbb8da8f-f374-490f-9190-2242176e117c' // replace the string with YOUR tenant ID
const REDIRECT_URL = "azure://com.reactntstarter/android/callback"
const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
    redirectUri: Platform.OS === 'ios' ? "com.reactntstarter://com.reactntstarter/ios/callback" : "azure://com.reactntstarter/android/callback" ,
    authorityUrl: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}`
});

// const azureAuth = new AzureAuth({
//     clientId: CLIENT_ID,
//     redirectUri: "azure://com.reactntstarter/android/callback",
//     authorityUrl: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}`
// });

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class LoginScreen extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = { accessToken: null, user: '', mails: [], userId: '' };
    }


    _onLogin = async () => {
        try {
            let tokens = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read' })
            console.log('CRED>>>', tokens)
            this.setState({ accessToken: tokens.accessToken });
            await AsyncStorage.setItem('accessToken', tokens.accessToken);
            let info = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: 'me' })
            this.setState({ user: info.displayName, userId: tokens.userId });
            this.props.navigation.navigate('Starter');
        } catch (error) {
            console.log('Error during Azure operation', error)
        }
    };

    getCustomScope = async () => {
        try {
            let tokens = await azureAuth.auth.acquireTokenSilent({ scope: 'api://ebb86a39-32dd-426f-a28a-45d2d9e5d302/TA.ADMIN', userId: this.state.userId })
            if (!tokens) {
                // No cached tokens or the requested scope defines new not yet consented permissions
                // Open a window for user interaction
                tokens = await azureAuth.webAuth.authorize({ scope: 'api://ebb86a39-32dd-426f-a28a-45d2d9e5d302/TA.ADMIN' })
            }
            console.log(tokens)
            this.setState({ customScopeToken: tokens.accessToken })
        } catch (error) {
            console.log('Error during Azure operation', error)
        }
    }

    _onLogout = () => {
        this.setState({ accessToken: null, user: null });
        // azureAuth.webAuth
        //   .clearSession({ closeOnLoad: true })
        //   .then((success: any) => {
        //     this.setState({ accessToken: null, user: null });
        //   })
        //   .catch((error: any) => console.log(error));
    };

    render() {
        let loggedIn = this.state.accessToken ? true : false;
        return (
            <Container style={styles.container}>
                <Content>
                    <H1 style={styles.header}>HELLO TA PLUS !</H1>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.buttons}
                            rounded
                            onPress={this._onLogin}
                        >
                            <Text style={styles.text}>Login With Azure</Text>
                        </Button>
                    </View>

                    {/* <Button
                        block
                        bordered
                        success
                        onPress={this.getCustomScope}
                        disabled={!loggedIn}
                    >
                        <Text>GET CUSTOM SCOPE TOKEN</Text>
                    </Button>
                    {this.state.customScopeToken && loggedIn ?
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        {this.state.customScopeToken}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        : null} */}
                </Content>
            </Container>
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
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        textAlign: 'center',
        margin: 30
    },
    text: {
        textAlign: 'center'
    },
    buttons: {
        justifyContent: 'space-around',
        padding: 20
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

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);