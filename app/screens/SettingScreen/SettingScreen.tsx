import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class SettingScreen extends Component<Props> {
  static navigationOptions: {
    title: "Setting"
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the SettingPage.</Text>
      </View>
    );
  }
}

export default SettingScreen;