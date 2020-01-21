//import styles from './styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, FlatList, Image, RefreshControl, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Button, Text, Content, Tab, Tabs, Spinner, Left, Icon, Badge } from 'native-base';
import { ButtonGroup } from 'react-native-elements'
import ActionSheet from 'react-native-action-sheet';
import moment from 'moment'

import HomeScreenAction from './HomeScreenAction'

const mapStateToProps = (reduxState: any) => ({
  ...reduxState,
  HomeScreenState: reduxState.HomeScreenState
})

const ASMenu = [
  'View by Scheduled',
  'View by Status'
]

interface IState {
  selectedIndex: number
  selectedStatus: string | null
  mode: 'scheduled' | 'status'
}

class HomeScreen extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedStatus: null,
      mode: 'scheduled'
    }

    this.updateIndex = this.updateIndex.bind(this)
    this._navigateToDetail = this._navigateToDetail.bind(this)
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: "MY TRIP",
      headerRight: () => (
        <TouchableOpacity
          style={{ padding: 10, marginRight: 5 }}
          onPress={() => {
            ActionSheet.showActionSheetWithOptions({
              options: ASMenu,
              tintColor: 'blue'
            },
              (buttonIndex) => {
                let mode = buttonIndex === 1 ? 'status' : 'scheduled'
                navigation.setParams({ mode: mode })
              });
          }}>
          <Image
            style={{ alignItems: "flex-end" }}
            source={require('../../assets/icons/option/option.png')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (<View></View>),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        fontWeight: "bold"
      }
    };
  }

  updateIndex(index: number) {
    this.setState({ selectedIndex: index })
    this.fetchTrip(index)
  }

  _navigateToDetail = (param: any) => {
    this.props.navigation.navigate("TripDetail", { data: param })
  }

  componentDidMount() {
    this.props.fetchTripStatus()
    this.fetchTrip(0) //Method for API call
  }

  getStatusText(selectedIndex: any) {
    const { mode } = this.props.navigation.state.params
    if (mode === 'scheduled' && selectedIndex === 0) {
      return 'status=300&status=301&status=302&status=303&status=304&status=305&status=306'
    } else if ((mode === 'scheduled' && selectedIndex === 1)) {
      return 'status=307'
    } else {
      return 'status=' + (selectedIndex + 300)
    }
  }

  fetchTrip = async (selectedIndex: any | null = null) => {
    const statusText = await this.getStatusText(selectedIndex)
    this.props.fetchTrip("", statusText)
  }

  handleLoadMore = async () => {
    const { selectedIndex } = this.state
    const statusText = await this.getStatusText(selectedIndex)
    this.props.loadMoreTrip("", statusText)
  };

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
    const { selectedIndex } = this.state
    this.fetchTrip(selectedIndex);
  }

  getStatusBadgeColor(statusId: any) {
    switch (statusId) {
      case 300:
        return "#AEB3B8"
      case 301:
        return "#E0BE00"
      case 302:
        return "#472F92"
      case 303:
        return "#064ACB"
      case 304:
        return "#FF7600"
      case 305:
        return "#CC0000"
      case 306:
        return "#00AEEF"
      case 307:
        return "#19C155"
      case 308:
        return "#AEB3B8"
      default:
        return "#AEB3B8"
    }
  }

  getGroupButton(mode: string) {
    let buttons = ['SCHEDULED', 'COMPLETED']
    if (mode === 'status') {
      buttons = this.props.HomeScreenState.tripStatus.map((item: any) => {
        return item.staNameEn.toUpperCase()
      })
    }

    return buttons
  }

  render() {
    const { selectedIndex }: any = this.state
    const { HomeScreenState } = this.props
    const { mode } = this.props.navigation.state.params
    const buttons = this.getGroupButton(mode)
    if (mode !== this.state.mode) {
      this.setState({ mode: mode })
      this.updateIndex(0)
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{ maxHeight: 54 }} horizontal={mode === 'status' ? true : false}>
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
              borderColor: '#AEB3B8',
            }}
            buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#AEB3B8', padding: 20, borderBottomWidth: 1 }}
            selectedButtonStyle={{
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 4,
              borderBottomColor: "#064ACB"
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
          (HomeScreenState.loading && HomeScreenState.page === 1) ?
            <View style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              flex: 1
            }}>
              <Spinner color='#064ACB' />
            </View>
            :
            <FlatList
              data={HomeScreenState.tripData}
              extraData={HomeScreenState.tripData}
              refreshControl={
                <RefreshControl
                  refreshing={HomeScreenState.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  tintColor="#fff"
                  titleColor="#533AAF"
                />
              }
              renderItem={({ item }: any) => {
                const travellingDate = moment(item.taTravellingDate)
                const returnDate = moment(item.taReturnDate)

                return (
                  <TouchableOpacity style={[styles.box, styles.shadow3]} onPress={() => this._navigateToDetail(item)}>
                    <ImageBackground
                      source={{ uri: "https://lh3.googleusercontent.com/-6VxSMm1TDe4/Xha2nE0D2ZI/AAAAAAAAALk/t-qkOIGM4rUFqWOqs8XcgoA21xd0BSD9gCK8BGAsYHg/s0/2020-01-08.png" }}
                      style={{
                        height: 180,
                        width: '100%'
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 15 }}>
                        <Badge style={{ justifyContent: 'center', backgroundColor: this.getStatusBadgeColor(item.tsStaId), height: 35, padding: 20, paddingLeft: 10, paddingRight: 10 }}>
                          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{HomeScreenState.tripStatus.find((statusObj: any) => statusObj.staId === item.tsStaId).staNameEn}</Text>
                        </Badge>
                      </View>
                    </ImageBackground>
                    <View style={{ flex: 1, padding: 15, paddingLeft: 20 }}>
                      <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.taObjective}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                        <Image style={{
                          height: 24,
                          width: 24,
                          marginRight: 5
                        }} source={require('../../assets/icons/pin/pin-24px.png')} />
                        <Text style={{ fontSize: 16, color: '#AEB3B8' }}>
                          {
                            item.tripDestination[item.tripDestination.length - 1].destination.subTitle ?
                              `${item.tripDestination[item.tripDestination.length - 1].destination.title}, ${item.tripDestination[item.tripDestination.length - 1].destination.subTitle}`
                              : `${item.tripDestination[item.tripDestination.length - 1].destination.title}`
                          }
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                        <Image style={{
                          height: 24,
                          width: 24,
                          marginRight: 5
                        }} source={require('../../assets/icons/clock/clock-24px.png')} />
                        <Text style={{ fontSize: 16, color: '#AEB3B8' }}>{`${returnDate.from(travellingDate, true)} (${travellingDate.format('DD MMM YYYY')} - ${returnDate.format('DD MMM YYYY')})`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter.bind(this)}
              onEndReachedThreshold={0.4}
              onEndReached={HomeScreenState.tripData.length === HomeScreenState.tripDataTotal ? null : this.handleLoadMore.bind(this)}
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