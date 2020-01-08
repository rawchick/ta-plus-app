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

class DetailScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

export default DetailScreen;