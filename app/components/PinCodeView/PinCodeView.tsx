import React, { Component } from 'react'
import PinView from 'react-native-pin-view'
import { Icon } from 'native-base'

export default class PinCodeView extends Component<any> {
    render() {
        return (
            <PinView
                onComplete={this.props.onComplete}
                pinLength={6}
                buttonDeletePosition="right"
                deleteText={<Icon name="md-close" />}
                customButtonText={<Icon name="finger-print" />}
                inputViewStyle={{
                    width: 20,
                    height: 20,
                    margin: 10,
                    borderWidth: 2,
                    borderColor: '#064ACB',
                    opacity:1
                }}
                inputBgColor={"#FFFFFF"}
                inputActiveBgColor={'#064ACB'}
                keyboardContainerStyle={{ marginTop: 20 }}
                keyboardViewStyle={{ borderWidth: 2, borderColor: "#707070" }}
                onCustomButtonPress={this.props.onCustomButtonPress}
            />
        )
    }
}