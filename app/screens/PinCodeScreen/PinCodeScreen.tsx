import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Text, Icon } from 'native-base';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerPrintAndroid from '../../components/FingerPrintComponent/FingerPrintAndroid';
import styles from '../../components/FingerPrintComponent/styles'
import PinCodeScreenAction from '../PinCodeScreen/PinCodeScreenAction'
import AsyncStorage from '@react-native-community/async-storage';
import PinCodeView from '../../components/PinCodeView/PinCodeView'

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    PinCodeScreenState: reduxState.PinCodeScreenState
})

class PinCodeScreen extends Component<any> {
    constructor(props: any) {
        super(props);
        this.onPinCodeComplete = this.onPinCodeComplete.bind(this)
        this.handleFingerprintShowed = this.handleFingerprintShowed.bind(this)
        this.handleFingerprintDismissed = this.handleFingerprintDismissed.bind(this)
        this.detectFingerprintAvailable = this.detectFingerprintAvailable.bind(this)
    }

    handleFingerprintShowed() {
        this.props.toggleFingerPrintPopup(true)
        FingerprintScanner
            .isSensorAvailable()
            .then((biometryType: any) => console.log(biometryType))
            .catch(error => console.log(error));
    };

    handleFingerprintDismissed() {
        this.props.toggleFingerPrintPopup(false)
    };

    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => console.log(biometryType))
            .catch(error => console.log(error));
    }

    detectFingerprintAvailable() {
        FingerprintScanner
            .isSensorAvailable()
            .catch(error => {
                const errorObj: any = { fingerPrintErrorMessage: error.message, biometric: error.biometric }
                this.props.setFingerPrintError(errorObj)
            });
    }

    onPinCodeComplete = async (inputtedPin: any, clear: any) => {
        const pinCodeSet = await AsyncStorage.getItem('pinCode')
        if (pinCodeSet) {
            if (inputtedPin === pinCodeSet) {
                this.props.navigation.navigate('App')
            } else {
                this.props.setPinCodeError('Your pin is not match !')
                clear()
            }
        } else {
            if (!this.props.PinCodeScreenState.pinCode) {
                this.props.setPinCode(inputtedPin)
                clear()
            } else if (!this.props.PinCodeScreenState.pinCodeConfirmation) {
                if (inputtedPin !== this.props.PinCodeScreenState.pinCode) {
                    this.props.setPinCodeError('Comfirmation pin is not match !');
                    clear()
                } else {
                    this.props.confirmPinCode(inputtedPin)
                    this.props.navigation.navigate('App');
                }
            }
        }
    }

    render() {
        console.log(this.props.PinCodeScreenState.pinCodeHeaderMessage)
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 2,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        style={{ width: undefined, height: '80%', aspectRatio: 1 }}
                        source={{ uri: 'https://lh3.googleusercontent.com/-xv-5w6TW3t4/Xg7bp5oRL-I/AAAAAAAAAJk/e2HtX2F4FBcR9OrGV0x0uHxzS5cF3lFvwCK8BGAsYHg/s0/1-02.png' }}
                    />
                    {
                        this.props.PinCodeScreenState.pinCodeErrorMessage ?
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: "red" }}>{this.props.PinCodeScreenState.pinCodeErrorMessage}</Text>
                            : <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.props.PinCodeScreenState.pinCodeHeaderMessage}</Text>
                    }
                </View>
                <View style={{
                    flex: 8,
                    backgroundColor: '#fff',
                    justifyContent: 'center'
                }}>
                    <PinCodeView
                        onComplete={this.onPinCodeComplete}
                        onCustomButtonPress={this.handleFingerprintShowed}
                    />

                </View>
                {
                    this.props.PinCodeScreenState.fingerPrintPopupShowed && (
                        <FingerPrintAndroid handlePopupDismissed={this.handleFingerprintDismissed} />
                    )
                }
            </View>
        );
    }
}

export default connect(mapStateToProps, { ...PinCodeScreenAction })(PinCodeScreen);