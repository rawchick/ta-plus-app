import React, { Component } from 'react';
import styles from './styles'
import { connect } from 'react-redux'
import { Text, View, FlatList, Image, RefreshControl, TouchableHighlight } from 'react-native';
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
    if (searchType === 'Traveler' || searchType === 'ClearanceStaff') {
      this.props.fetchUser()
    } else if (searchType === 'FromLocation' || searchType === 'DestinationLocation') {
      this.props.fetchPlace()
    }
  }

  onRefresh() {
    const { searchType } = this.props.navigation.state.params
    if (searchType === 'Traveler' || searchType === 'ClearanceStaff') {
      this.props.fetchUser()
    } else if (searchType === 'FromLocation' || searchType === 'DestinationLocation') {
      this.props.fetchPlace()
    }
  }

  search(text: any) {
    const { searchType } = this.props.navigation.state.params
    if (searchType === 'Traveler' || searchType === 'ClearanceStaff') {
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

    if (searchType === 'Traveler') {
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
                  leftAvatar={{ source: { uri: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png" } }}
                  containerStyle={{ backgroundColor: '#fff', marginLeft: 10, borderTopWidth: 1 }}
                  key={item.id}
                  title={searchType === 'Traveler' || searchType === 'ClearanceStaff' ? item.firstName + ' ' + item.sureName : item.title}
                  subtitle={searchType === 'Traveler' || searchType === 'ClearanceStaff' ? item.jobTitle : item.subTitle}
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