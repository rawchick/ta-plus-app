import styles from './styles';
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon, Button, Badge } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import Modal from "react-native-modal";
import moment from 'moment'

let groupButton = ['TRIP DETAIL', 'TRANSPORT INFO']
const exampleArray = [
  {
    "id": 1,
    "title": "JS"
  },
  {
    "id": 2,
    "title": "PS"
  },
  {
    "id": 3,
    "title": "AD"
  },
  {
    "id": 4,
    "title": "OP"
  },
  {
    "id": 5,
    "title": "WW"
  }
]
class TripDetailScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
    };

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: null,
    }
  }

  render() {
    const tripDetail = this.props.navigation.state.params.data
    const travellingDate = moment(tripDetail.taTravellingDate)
    const returnDate = moment(tripDetail.taReturnDate)

    return (
      <ScrollView>
        <Modal isVisible={this.state.modalVisible}>
          <View style={{ backgroundColor: '#fff', minHeight: 200, borderRadius: 10, padding: 20 }}>
            <TouchableOpacity style={{ justifyContent: 'space-between' }}>
              <Image style={{ alignItems: "flex-end" }} source={require('../../assets/icons/close/close-24px.png')} />
            </TouchableOpacity>
          </View>
        </Modal>
        <ImageBackground source={{ uri: 'https://lh3.googleusercontent.com/-6VxSMm1TDe4/Xha2nE0D2ZI/AAAAAAAAALk/t-qkOIGM4rUFqWOqs8XcgoA21xd0BSD9gCK8BGAsYHg/s0/2020-01-08.png' }} style={{ padding: 10, height: 170, flex: 1, justifyContent: "space-between" }}>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={{
                height: 36,
                width: 36,
                margin: 10
              }} source={require('../../assets/icons/keyboard_arrow_left/keyboard_arrow_left-24px.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={{
                height: 36,
                width: 36,
                margin: 10
              }} source={require('../../assets/icons/edit_pencil/edit-24px.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
            <Badge style={{ justifyContent: 'center', backgroundColor: '#AEB3B8', height: 40, padding: 20, paddingLeft: 40, paddingRight: 40 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Draft</Text>
            </Badge>
          </View>
        </ImageBackground>
        <View>
          <ScrollView horizontal={false}>
            <ButtonGroup
              onPress={this.updateIndex}
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
                onPress={() => this.setModalVisible(true)}
              >
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{`${tripDetail.traveler.firstName.slice(0, 1)}${tripDetail.traveler.sureName.slice(0, 1)}`}</Text>
              </TouchableOpacity>
              <View
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
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`${tripDetail.preparer.firstName.slice(0, 1)}${tripDetail.preparer.sureName.slice(0, 1)}`}</Text>
              </View>
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
                  exampleArray.map((item: any) =>
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
                      key={item.employeeId}
                    >
                      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                }
                <TouchableOpacity style={{
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  borderColor: "#AEB3B8",
                  margin: 10
                }} >
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
      </ScrollView>
    );
  }
}

export default TripDetailScreen;