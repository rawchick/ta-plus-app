import React, { Component } from 'react';
import styles from './styles'
import { connect } from 'react-redux'
import { Text, View, FlatList, Image, RefreshControl, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Item, Input, Spinner } from 'native-base'
import { ListItem } from 'react-native-elements'
import SearchScreenAction from './SearchScreenAction'
import NewTripScreenAction from '../NewTripScreen/NewTripScreenAction'

const mapStateToProps = (reduxState: any) => ({
  ...reduxState,
  SearchScreenState: reduxState.SearchScreenState
})

class SearchScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this._getData = this._getData.bind(this)
  }

  handleLoadMore = () => {
    if (!this.props.HomeScreenState.loading) {
      this.props.loadMoreUser(); // method for API call 
    }
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
      <View />
    );
  };

  componentDidMount() {
    const { searchType } = this.props.navigation.state.params
    if (searchType === 'Traveler' || searchType === 'ClearanceStaff' || searchType === 'NonBanpuForm') {
      this.props.fetchUser()
    } else if (searchType === 'FromLocation' || searchType === 'DestinationLocation') {
      this.props.fetchPlace()
    }
  }

  onRefresh() {
    const { searchType } = this.props.navigation.state.params
    if (searchType === 'Traveler' || searchType === 'ClearanceStaff' || searchType === 'NonBanpuForm') {
      this.props.fetchUser()
    } else if (searchType === 'FromLocation' || searchType === 'DestinationLocation') {
      this.props.fetchPlace()
    }
  }

  search(text: any) {
    const { searchType } = this.props.navigation.state.params
    if (searchType === 'Traveler' || searchType === 'ClearanceStaff' || searchType === 'NonBanpuForm') {
      this.props.fetchUser(text)
    } else if (searchType === 'FromLocation' || searchType === 'DestinationLocation') {
      this.props.fetchPlace(text)
    }
  }

  _getData(data: any) {
    const {
      searchType,
      setField = () => { }
    }: {
      searchType: string,
      setField: (data: any) => void
    } = this.props.navigation.state.params

    if (searchType === 'Traveler' || searchType === 'NonBanpuForm') {
      this.props.setTravellerData(data)
    } else if (searchType === 'FromLocation') {
      this.props.setFromLocationData(data)
    } else if (searchType === 'DestinationLocation') {
      this.props.stackDestination(data)
    } else if (searchType === 'ClearanceStaff') {
      this.props.stackClearanceStaff(data)
    }
    setField(data)
    this.props.clearList()
    this.props.navigation.navigate('NewTrip', { update: true })
  }

  render() {
    const { searchType } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Item rounded style={{ margin: 15, marginLeft: 15 }} >
          <Input style={{ paddingLeft: 20 }} placeholder='Search' onChangeText={(text) => this.search(text)} />
        </Item>
        {
          searchType === 'NonBanpuForm' ?
            <ListItem
              leftElement={
                <View
                  style={{
                    width: 60,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    borderColor: "#AEB3B8"
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 20,
                      height: 20,
                      zIndex: 5
                    }}
                  >
                    <Image style={{
                      width: 20,
                      height: 20,
                    }} source={require('../../assets/icons/add_circle_green/add_circle_green.png')} />
                  </View>
                  <Image style={{
                    width: 60,
                    height: 60,
                  }} source={require('../../assets/icons/non_banpu_person/non_banpu_person.png')} />
                </View>
              }
              containerStyle={{ backgroundColor: '#fff', marginLeft: 10, borderTopWidth: 1, borderBottomWidth: 1 }}
              key={0}
              title={"Add non-Banpu traveler"}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => this.props.navigation.navigate('NonBanpuFrom')}
            /> : null
        }
        {
          (this.props.SearchScreenState.loading && this.props.SearchScreenState.page === 1) ?
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
              data={this.props.SearchScreenState.listData}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.SearchScreenState.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  tintColor="#fff"
                  titleColor="#533AAF"
                />
              }
              renderItem={({ item }: any) => (
                <ListItem
                  leftElement={
                    searchType === 'Traveler' || searchType === 'NonBanpuForm' ?
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#AC91FD",
                          borderWidth: 3,
                          borderRadius: 50,
                          borderColor: "#AC91FD",
                        }}
                        key={item.key}
                      >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{item.firstName ? `${item.firstName.slice(0, 1)}${item.sureName.slice(0, 1)}` : ''}</Text>
                      </View>
                      :
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 50,
                          borderColor: "#AEB3B8"
                        }}
                      >
                        <Image style={{
                          width: 60,
                          height: 60,
                        }} source={require('../../assets/icons/plane/plane.png')} />
                      </View>
                  }
                  containerStyle={{ backgroundColor: '#fff', marginLeft: 10, borderBottomWidth: 1 }}
                  key={item.id}
                  titleStyle={{ fontWeight: 'bold' }}
                  title={searchType === 'Traveler' || searchType === 'ClearanceStaff' || searchType === 'NonBanpuForm' ? item.firstName + ' ' + item.sureName : item.title}
                  subtitle={searchType === 'Traveler' || searchType === 'ClearanceStaff' || searchType === 'NonBanpuForm' ? item.jobTitle : item.subTitle}
                  onPress={() => this._getData(item)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter.bind(this)}
              onEndReachedThreshold={0.4}
            />
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, { ...SearchScreenAction, ...NewTripScreenAction })(SearchScreen);