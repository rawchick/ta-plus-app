import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, AppState } from 'react-native';
import PinView from 'react-native-pin-view';
import { Text, Icon } from 'native-base';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import FingerPrintAndroid from '../FingerPrintScreen/FingerPrintScreenAndroid';
import styles from '../FingerPrintScreen/styles'
import PinCodeScreenAction from '../PinCodeScreen/PinCodeScreenAction'
import AsyncStorage from '@react-native-community/async-storage';

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    PinCodeScreenState: reduxState.PinCodeScreenState
})

class PinCodeScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onComplete = this.onComplete.bind(this);
        this.handleFingerprintShowed = this.handleFingerprintShowed.bind(this)
    }

    handleFingerprintShowed = () => {
        this.props.toggleFingerPrintPopup(true)
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => console.log(biometryType))
            .catch(error => console.log(error));
    };

    handleFingerprintDismissed = () => {
        this.props.toggleFingerPrintPopup(false)
    };

    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => console.log(biometryType))
            .catch(error => console.log(error));
    }

    componentWillUnmount() {
        FingerprintScanner.release();
    }

    detectFingerprintAvailable = () => {
        FingerprintScanner
            .isSensorAvailable()
            .catch(error => this.setState({ fingerPrintErrorMessage: error.message, fingerPrintBiometric: error.biometric }));
    }

    onComplete = async (inputtedPin: any, clear: any) => {
        const pinCode = await AsyncStorage.getItem('pinCode');
        if (pinCode) {
            if (inputtedPin === pinCode) {
                this.props.navigation.navigate('App');
            } else {
                this.props.updateErrMessage('PIN is Wrong !');
                clear()
            }
        } else {
            if (this.props.PinCodeScreenState.mode === "enter") {
                this.props.setPinCode(inputtedPin)
                clear()
            } else if (this.props.PinCodeScreenState.mode === "confirm") {
                if (inputtedPin !== this.props.PinCodeScreenState.pinCode) {
                    this.props.updateErrMessage('Comfirmation PIN is Wrong !');
                    clear()
                } else {
                    this.props.confirmPinCode(inputtedPin)
                    this.props.navigation.navigate('App');
                }
            }
        }
    }

    onPress(inputtedPin: any, clear: any, pressed: any) {
        console.log("Pressed: " + pressed);
        console.log("inputtedPin: " + inputtedPin);
    }

    render() {
        const { fingerPrintPopupShowed } = this.props.PinCodeScreenState;
        return (
            <>
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
                        !this.props.PinCodeScreenState.pinCodeErrMessage && this.props.PinCodeScreenState.mode === 'enter' ?
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Please Enter Your PIN</Text>
                            : null
                    }
                    {
                        !this.props.PinCodeScreenState.pinCodeErrMessage && this.props.PinCodeScreenState.mode === 'confirm' ?
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Please Comfirm PIN</Text>
                            : null
                    }
                    {
                        this.props.PinCodeScreenState.pinCodeErrMessage ?
                            < Text style={{ textAlign: 'center', fontWeight: 'bold', color: "red" }}>{this.props.PinCodeScreenState.pinCodeErrMessage}</Text>
                            : null
                    }
                </View>
                <View style={{
                    flex: 8,
                    backgroundColor: '#fff',
                    justifyContent: 'center'
                }}>
                    <PinView
                        onPress={this.onPress}
                        onComplete={this.onComplete}
                        pinLength={6}
                        buttonDeletePosition="right"
                        deleteText={<Icon name="md-close" />}
                        customButtonText={<Icon name="finger-print" />}
                        inputActiveBgColor="#1C7CD5"
                        keyboardContainerStyle={{ marginTop: 20 }}
                        keyboardViewStyle={{ borderWidth: 2, borderColor: "#707070" }}
                        onCustomButtonPress={this.handleFingerprintShowed}
                    />
                </View>
                {
                    fingerPrintPopupShowed && (
                        <FingerPrintAndroid
                            style={styles.popup}
                            handlePopupDismissed={this.handleFingerprintDismissed}
                        />
                    )
                }
            </>
        );
    }
}

export default connect(mapStateToProps, { ...PinCodeScreenAction })(PinCodeScreen);