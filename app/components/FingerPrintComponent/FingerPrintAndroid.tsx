import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from '../ShakingText/ShakingText';
import styles from './styles';

class FingerprintPopup extends Component<any, any> {
  description: any;
  constructor(props: any) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        this.props.handleSuccess();
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        this.description.shake();
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error: any) => {
    this.setState({ errorMessage: error.message });
    this.description.shake();
  };

  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>
          <Text style={{
            fontSize: 21,
            fontWeight: 'bold',
            marginBottom: 10
          }}>
            Login
          </Text>
          <Text style={{
            fontSize: 18,
            color: "#0000008A",
            fontWeight: 'bold',
          }}>
            Login with your fingerprint or cancel to enter pin.
          </Text>


          <Image
            style={styles.logo}
            source={require('../../assets/icons/finger_print/finger_print.png')}
          />
          {
            errorMessage ?
              <ShakingText
                ref={(instance) => { this.description = instance; }}
                style={styles.description(!!errorMessage)}>
                {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
              </ShakingText> : null
          }

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissed}
          >
            <Text style={styles.buttonText}>
              CANCEL
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

FingerprintPopup.propTypes = {
  style: ViewPropTypes.style,
  handlePopupDismissed: PropTypes.func.isRequired,
};

export default FingerprintPopup;