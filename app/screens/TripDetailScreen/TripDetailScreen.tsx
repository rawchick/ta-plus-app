import styles from './styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity, ImageBackground, Keyboard } from 'react-native';
import { Icon, Button, Badge } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import Modal from "react-native-modal";
import moment from 'moment'
import TripDetailScreenAction from './TripDetailScreenAction'

const mapStateToProps = (reduxState: any) => ({
  ...reduxState,
  TripDetailScreenState: reduxState.TripDetailScreenState
})

let groupButton = ['TRIP DETAIL', 'TRANSPORT INFO']

class TripDetailScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      tabIndex: 0,
      modalData: null,
      isRemovableTripUser: false
    };

    this.setModalVisible = this.setModalVisible.bind(this)
    this.updateTabIndex = this.updateTabIndex.bind(this)
    this._goToSearchScreen = this._goToSearchScreen.bind(this)
  }

  setModalVisible(visible: boolean, data: any, flag: boolean = false) {
    this.setState({ modalVisible: visible, modalData: data, isRemovableTripUser: flag });
  }

  updateTabIndex(index: number) {
    this.setState({ tabIndex: index })
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

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: null,
    }
  }

  _goToSearchScreen = async (
    topic: "Traveler" | "FromLocation" | "DestinationLocation" | "ClearanceStaff" | "NonBanpuForm"
  ) => {
    Keyboard.dismiss()
    this.props.navigation.navigate("TripDetailSearchScreen", {
      searchType: topic
    })
  }

  render() {
    const { modalData, isRemovableTripUser } = this.state
    const tripDetail = this.props.navigation.state.params.data
    const travellingDate = moment(tripDetail.taTravellingDate)
    const returnDate = moment(tripDetail.taReturnDate)
    const { traveler, tripUser, preparer } = tripDetail

    return (
      <ScrollView>
        <Modal isVisible={this.state.modalVisible} animationIn="slideInUp" onSwipeComplete={() => this.setModalVisible(false, null)}
          swipeDirection="down">
          <View style={{ backgroundColor: '#fff', minHeight: 200, borderRadius: 10, padding: 20 }}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.setModalVisible(false, null)}>
                <Image style={{ alignItems: "flex-end" }} source={require('../../assets/icons/close/close-24px.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  alignSelf: 'center',
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#AC91FD",
                  borderWidth: 3,
                  borderRadius: 50,
                  borderColor: "#AC91FD",
                  margin: 10,
                  marginBottom: 0
                }}
              >
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{modalData ? `${modalData.firstName.slice(0, 1)}${modalData.sureName.slice(0, 1)}` : ""}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5 }}>
              <Image style={{
                height: 30,
                width: 30,
                marginRight: 5
              }} source={require('../../assets/icons/person/person.png')} />
              <View style={{ flexWrap: 'wrap', paddingLeft: 5 }}>
                <Text style={{ fontSize: 18, alignSelf: 'flex-start', fontWeight: 'bold' }}>
                  {modalData ? modalData.firstName + " " + modalData.sureName : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
              <Image style={{
                height: 30,
                width: 30,
                marginRight: 5
              }} source={require('../../assets/icons/work_icon/work.png')} />
              <View style={{ flexWrap: 'wrap', paddingLeft: 5 }}>
                <Text style={{ fontSize: 18, alignSelf: 'flex-start', color: '#232127' }}>
                  {modalData ? modalData.jobTitle : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
              <Image style={{
                height: 30,
                width: 30,
                marginRight: 5
              }} source={require('../../assets/icons/phone/phone.png')} />
              <View style={{ flexWrap: 'wrap', paddingLeft: 5 }}>
                <Text style={{ fontSize: 18, alignSelf: 'flex-start', color: '#232127' }}>
                  {modalData ? modalData.phoneNumber ? modalData.phoneNumber : '-' : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
              <Image style={{
                height: 30,
                width: 30,
                marginRight: 5
              }} source={require('../../assets/icons/mail/mail.png')} />
              <View style={{ flexWrap: 'wrap', paddingLeft: 5 }}>
                <Text style={{ fontSize: 18, alignSelf: 'flex-start', color: '#232127' }}>
                  {modalData ? modalData.email ? modalData.email : '-' : ''}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
              <Image style={{
                height: 30,
                width: 30,
                marginRight: 5
              }} source={require('../../assets/icons/line_app/line_app.png')} />
              <View style={{ flexWrap: 'wrap', paddingLeft: 5 }}>
                <Text style={{ fontSize: 18, alignSelf: 'flex-start', color: '#232127' }}>
                  {modalData ? modalData.lineId ? modalData.lineId : '-' : ''}
                </Text>
              </View>
            </View>
            {
              isRemovableTripUser &&
              <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    padding: 20,
                    marginBottom: 10,
                    marginTop: 30,
                    borderWidth: 2,
                    borderColor: '#DDDDDD',
                    borderRadius: 50
                  }}
                  onPress={() => {
                    console.log("remove")
                  }}
                >
                  <Image style={{
                    height: 30,
                    width: 30,
                    marginRight: 5
                  }} source={require('../../assets/icons/red_bin/red_bin.png')} />
                  <Text style={{ textAlign: 'center', color: "#232127", fontSize: 18 }}>Remove</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </Modal>
        <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/-6VxSMm1TDe4/Xha2nE0D2ZI/AAAAAAAAALk/t-qkOIGM4rUFqWOqs8XcgoA21xd0BSD9gCK8BGAsYHg/s0/2020-01-08.png' }} style={{ padding: 10, height: 170, flex: 1, justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Image style={{
                height: 36,
                width: 36,
                margin: 10
              }} source={require('../../assets/icons/back_button/back_button.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={{
                height: 36,
                width: 36,
                margin: 10
              }} source={require('../../assets/icons/edit_button/edit_button.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
            <Badge style={{ justifyContent: 'center', backgroundColor: this.getStatusBadgeColor(tripDetail.tsStaId), height: 40, padding: 20, paddingLeft: 40, paddingRight: 40 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{this.props.HomeScreenState.tripStatus.find((statusObj: any) => statusObj.staId === tripDetail.tsStaId).staNameEn}</Text>
            </Badge>
          </View>
        </ImageBackground>
        <View>
          <ScrollView horizontal={false}>
            <ButtonGroup
              onPress={this.updateTabIndex}
              selectedIndex={0}
              buttons={groupButton}
              containerStyle={{
                height: 50,
                width: '100%',
                marginLeft: 0,
                marginTop: 0,
                borderRadius: 0,
              }}
              buttonStyle={{ backgroundColor: '#FFFFFF', borderColor: '#AEB3B8', padding: 20 }}
              selectedButtonStyle={{
                backgroundColor: '#FFFFFF',
                borderBottomWidth: 4,
                borderBottomColor: "#064ACB"
              }}
              textStyle={{
                color: '#AEB3B8',
                fontSize: 18,
                fontWeight: "bold"
              }}
              selectedTextStyle={{
                color: 'black'
              }} />
          </ScrollView>
        </View>
        <View style={{
          borderBottomWidth: 2,
          borderBottomColor: "#AEB3B8",
          margin: '3%',
          marginTop: '3%',
          marginLeft: '5%',
          marginRight: '5%',
          paddingBottom: '4%',
          flex: 1,
          justifyContent: "space-between"
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{tripDetail.taObjective}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, flexWrap: 'wrap' }}>
                <Image style={{
                  height: 24,
                  width: 24,
                  marginRight: 5
                }} source={require('../../assets/icons/pin/pin-24px.png')} />
                <Text style={{ fontSize: 16, color: '#AEB3B8' }}>
                  {
                    tripDetail.tripDestination[tripDetail.tripDestination.length - 1].destination.subTitle ?
                      `${tripDetail.tripDestination[tripDetail.tripDestination.length - 1].destination.title}, ${tripDetail.tripDestination[tripDetail.tripDestination.length - 1].destination.subTitle}`
                      : `${tripDetail.tripDestination[tripDetail.tripDestination.length - 1].destination.title}`
                  }
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, flexWrap: 'wrap' }}>
                <Image style={{
                  height: 24,
                  width: 24,
                  marginRight: 5
                }} source={require('../../assets/icons/clock/clock-24px.png')} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, color: '#AEB3B8' }}>{returnDate.from(travellingDate, true)}</Text>
                  <Text style={{ fontSize: 16, color: '#AEB3B8' }}>{`(${travellingDate.format('DD MMM YYYY')} - ${returnDate.format('DD MMM YYYY')})`}</Text>
                </View>
              </View>
            </View>
            <View style={{
              position: 'relative',
              width: 120,
              height: 100,
            }}>
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 90,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#AC91FD",
                  borderWidth: 3,
                  borderRadius: 50,
                  borderColor: "#AC91FD",
                  margin: 10,
                  marginBottom: 0
                }}
                onPress={() => this.setModalVisible(true, traveler)}
              >
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{`${traveler.firstName.slice(0, 1)}${traveler.sureName.slice(0, 1)}`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderWidth: 3,
                  borderRadius: 50,
                  borderColor: "#AC91FD",
                }}
                onPress={() => this.setModalVisible(true, preparer)}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`${tripDetail.preparer.firstName.slice(0, 1)}${tripDetail.preparer.sureName.slice(0, 1)}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{
          borderBottomWidth: 2,
          borderBottomColor: "#AEB3B8",
          margin: '3%',
          marginTop: '1%',
          marginLeft: '5%',
          marginRight: '5%',
          paddingBottom: '4%',
          flex: 1,
          justifyContent: "space-between"
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                <Text style={{ fontSize: 20 }}>Accompany Staff</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                  tripUser.map((item: any, key: any) =>
                    <TouchableOpacity
                      style={{
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#AC91FD",
                        borderWidth: 3,
                        borderRadius: 50,
                        borderColor: "#AC91FD",
                        margin: 10
                      }}
                      key={item.key}
                      onPress={() => this.setModalVisible(true, item.tripUser, true)}
                    >
                      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{`${item.tripUser.firstName.slice(0, 1)}${item.tripUser.sureName.slice(0, 1)}`}</Text>
                    </TouchableOpacity>
                  )
                }
                <TouchableOpacity
                  style={{
                    width: 70,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    borderColor: "#AEB3B8",
                    margin: 10
                  }}
                  onPress={() => this._goToSearchScreen('NonBanpuForm')}
                >
                  <Image style={{
                    width: 70,
                    height: 70,
                  }} source={require('../../assets/icons/add_circle/add-circle-outline.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{
          margin: '3%',
          marginTop: '1%',
          marginLeft: '5%',
          marginRight: '5%',
          paddingBottom: '4%',
          flex: 1,
          justifyContent: "space-between"
        }}>
          <Button rounded style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            backgroundColor: '#D9534F',
            margin: '30%',
            marginBottom: 20,
            marginTop: 20
          }}>
            <Text style={{ textAlign: 'center', color: "#FFFFFF", fontSize: 20 }}> DELETE </Text>
          </Button>
        </View>
      </ScrollView >
    );
  }
}

export default connect(mapStateToProps, { ...TripDetailScreenAction })(TripDetailScreen);