import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SplashScreenAction from '../SplashScreen/SplashScreenAction'
import azureAuth from '../../config/azure-ad'
import { iSplashScreenState } from '../../models/mSplashScreenState'
import styles from './styles'

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    SplashScreenState: reduxState.SplashScreenState
})

class SplashScreen extends Component<any> {
    ScreenState: iSplashScreenState;
    constructor(props: any) {
        super(props);
        this.ScreenState = this.props.SplashScreenState
        this._bootstrap()
    }

    _bootstrap = async () => {
        if (this.ScreenState.isLoggedIn) {
            this.props.navigation.navigate('PinCode')
        } else {
            let userTokens: any = await AsyncStorage.getItem('userTokens')
            if (!userTokens) {
                this.props.navigation.navigate('Auth')
            } else {
                userTokens = JSON.parse(userTokens)
                let accessTokens = await azureAuth.auth.acquireTokenSilent({
                    scope: 'api://ebb86a39-32dd-426f-a28a-45d2d9e5d302/TA.ADMIN',
                    userId: userTokens.userId
                })

                if (!accessTokens) {
                    accessTokens = await azureAuth.webAuth.authorize({
                        scope: 'api://ebb86a39-32dd-426f-a28a-45d2d9e5d302/TA.ADMIN'
                    })
                }

                this.props.refreshAccessToken(accessTokens)
                this.props.navigation.navigate('PinCode')
            }
        }
    }

    render() {
        return (
            <>
                <View style={styles.topContainer}>
                    <Text style={styles.topTextHeader}>Welcome to</Text>
                </View>
                <View style={styles.midContainer}>
                    <View style={styles.emptyContainer1}>
                    </View>
                    <View style={styles.subMidContainer1}>
                        <Image style={{ alignSelf: 'center' }} resizeMode="contain" source={require('../../assets/images/common/app_logo.png')} />
                    </View>
                    <View style={styles.emptyContainer1}>
                    </View>
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </>
        )
    }
}

export default connect(mapStateToProps, { ...SplashScreenAction })(SplashScreen);