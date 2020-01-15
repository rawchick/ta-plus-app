//import styles from './styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, FlatList, Image, RefreshControl, StyleSheet } from 'react-native';
import { Container, Button, Text, Content, Tab, Tabs, Spinner, Left, Icon } from 'native-base';
import { ButtonGroup } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-action-sheet';

import HomeScreenAction from './HomeScreenAction'

const mapStateToProps = (reduxState: any) => ({
  ...reduxState,
  HomeScreenState: reduxState.HomeScreenState
})

const ASMenu = [
  'View by Scheduled',
  'View by Status'
]

class HomeScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
    this._navigateToDetail = this._navigateToDetail.bind(this)
    this.switchHeaderMenu = this.switchHeaderMenu.bind(this)
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: "MY TRIP",
      headerRight: () => (
        <Icon
          name="options"
          fontSize={20}
          style={{ color: 'black', marginRight: 15 }}
          onPress={() => {
            ActionSheet.showActionSheetWithOptions({
              options: ASMenu,
              tintColor: 'blue'
            },
              (buttonIndex) => {
                console.log('button clicked :', buttonIndex);
              });
          }}
        />
      ),
      headerLeft: () => (<View></View>),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        fontWeight: "bold"
      }
    };
  }

  updateIndex(selectedIndex: number) {
    this.props.fetchUser()
    this.setState({ selectedIndex })
  }

  _navigateToDetail = (param: any) => () => {
    this.props.navigation.navigate("Detail", { param })
  }

  componentDidMount() {
    this.props.fetchUser() //Method for API call
  }

  handleLoadMore = () => {
    if (!this.props.HomeScreenState.loading) {
      this.props.loadMoreUser(); // method for API call 
    }
  };

  switchHeaderMenu = () => {
    console.log("SWITCH")
  }

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.HomeScreenState.loading) return null;
    return (
      <View style={{ paddingBottom: 20 }}>
        <Spinner color='#533AAF' />
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%'
        }}
      />
    );
  };

  onRefresh() {
    this.props.fetchUser();
  }


  render() {
    const { selectedIndex }: any = this.state
    const navParams = this.props.navigation.state.params
    const { mode } = navParams

    let buttons = ['SCHEDULED', 'COMPLETED']
    if (mode === 'filter') {
      buttons = [
        'DRAFT',
        'WAITING',
        'WAITING FOR APPROVE'
      ]
    }

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <ScrollView horizontal={mode === 'filter' ? true : false}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{
              height: 50,
              width: '100%',
              marginLeft: 0,
              marginTop: 0,
              borderRadius: 0,
            }}
            buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#707070', padding: 20 }}
            selectedButtonStyle={{
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 3,
              borderBottomColor: "#533AAF"
            }}
            textStyle={{
              color: '#707070',
              fontSize: 18,
              fontWeight: "bold"
            }}
            selectedTextStyle={{
              color: 'black'
            }} />
        </ScrollView>
        {
          (this.props.HomeScreenState.loading && this.props.HomeScreenState.page === 1) ?
            <View style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 20
            }}>
              <Spinner color='#533AAF' />
            </View>
            :
            <FlatList
              data={this.props.HomeScreenState.tripData}
              extraData={this.props.HomeScreenState}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.HomeScreenState.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  tintColor="#fff"
                  titleColor="#533AAF"
                />
              }
              renderItem={({ item }: any) => (
                <View style={[styles.box, styles.shadow3]}>
                  <Image source={{ uri: "https://lh3.googleusercontent.com/-6VxSMm1TDe4/Xha2nE0D2ZI/AAAAAAAAALk/t-qkOIGM4rUFqWOqs8XcgoA21xd0BSD9gCK8BGAsYHg/s0/2020-01-08.png" }} style={{ width: '100%', height: 200 }} />
                  <View style={{
                    alignItems: 'flex-start',
                    padding: 20
                  }}>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: 5
                    }}>
                      <Text style={{
                        fontSize: 18,
                        textAlign: 'left',
                        color: 'black',
                      }}>{item.trObjective}</Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: 5
                    }}>
                      <Icon name="pin" fontSize={20} style={{ color: 'black', marginRight: 15 }} />
                      <Text style={{
                        fontSize: 16,
                        color: "#707070"
                      }}>{item.location}, {item.country}</Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: 5
                    }}>
                      <Icon name="ios-clock" fontSize={20} style={{ color: 'black', marginRight: 15 }} />
                      <Text style={{
                        fontSize: 16,
                        color: "#707070"
                      }}>{item.period}</Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter.bind(this)}
              onEndReachedThreshold={0.4}
              // onEndReached={this.handleLoadMore.bind(this)}
            />
        }
      </View>
    );
  }
}

function elevationShadowStyle(elevation: any) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow1: elevationShadowStyle(5),
  shadow2: elevationShadowStyle(10),
  shadow3: elevationShadowStyle(20),
  box: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 0,
    margin: 15,
    overflow: 'hidden'
  },
  centerContent: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

export default connect(mapStateToProps, { ...HomeScreenAction })(HomeScreen);