import styles from './styles';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Button, Text, Content } from 'native-base';
// You only need NavigationScreenProps for TypeScript
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
//import HomeScreenAction from '../../redux/actions/HomeScreenAction'
import HomeCardItem from '../../components/HomeCardItem/HomeCardItem'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const mapStateToProps = (reduxState: any, ownProps: any) => ({
  ...reduxState.HomeScreenState
});

class HomeScreen extends Component<Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoggedIn: false
    }

    this.navigateToDetail = this.navigateToDetail.bind(this)
  }

  _bootstrap = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      this.setState({ isLoggedIn: true })
    }
  }

  navigateToDetail() {
    this.props.navigation.navigate("Detail", { title: 'Detail' })
  }

  render() {
    const { navigation } = this.props;
    console.log()
    return (
      <Container>
        <Content>
          <HomeCardItem onPress={this.navigateToDetail} />
          <HomeCardItem />
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;