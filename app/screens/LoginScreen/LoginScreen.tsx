import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import { Text } from 'native-base'
import { Icon } from 'react-native-elements'
import { iLoginScreenState } from '../../models/mLoginScreenState'
import LoginScreenAction from './LoginScreenAction';
import azureAuth from '../../config/azure-ad'
import styles from './styles'

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    LoginScreenState: reduxState.LoginScreenState
})

class LoginScreen extends Component<any> {
    ScreenState: iLoginScreenState;
    constructor(props: any) {
        super(props);
        this.ScreenState = this.props.LoginScreenState
    }

    componentDidMount() {

    }

    _onLogin = async () => {
        try {
            const tokens: any = await azureAuth.webAuth.authorize({ scope: 'openid profile User.Read' })
            const info: any = await azureAuth.auth.msGraphRequest({ token: tokens.accessToken, path: 'me' })
            console.log(info)
            this.props.signIn(tokens, info)
            this.props.navigation.navigate('Starter');
        } catch (error) {
            console.log('Error during Azure operation', error)
        }
    }

    render() {
        return (
            <>
                <View style={styles.topContainer}>
                    <Image style={styles.imageTop} source={require('../../assets/images/LoginScreen/login_header.png')} />
                </View>

                <View style={styles.midContainer}>
                    <Image style={styles.imageMid} source={require('../../assets/images/common/app_logo.png')} />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={this._onLogin} underlayColor="white">
                        <View style={styles.buttons}>
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

export default connect(mapStateToProps, { ...LoginScreenAction })(LoginScreen);