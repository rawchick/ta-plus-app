import React, { Component } from 'react'
import {
  Text,
  View,
  Keyboard,
  TouchableHighlight,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native'
import _ from 'lodash'
import {
  Container,
  Form,
  Content,
  Item,
  Input,
  Picker,
  DatePicker,
  Button,
} from 'native-base'
import { Icon } from 'react-native-elements'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import NewTripScreenAction from './NewTripScreenAction'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'
import ActionSheet from 'react-native-action-sheet'
import validation from './validation'
import DraggableFlatList from '../../components/NewTripScreen/DragableFlatList/DragableFlatList'
import styles from './styles'

const ASMenu = ['Remove']

const ErrorMessage = ({ errors }: any) => {
  const { touched, message } = errors
  return (
    (message && touched) ? (
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 16, color: 'red' }}>{message}</Text>
      </View>
    ) : null
  )
}

class NewTripScreen extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      selected: undefined,
      isTravellingDatePickerShow: false,
      isReturnDatePickerShow: false,
      isSelectedReturnDate: false,
      isSelectedTravellingDate: false,
      isSubmited: false,
    }
    this.removeDestinationItem = this.removeDestinationItem.bind(this)
    this.onClearanceStaffItemPress = this.onClearanceStaffItemPress.bind(this)
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: "NEW TRIP",
      headerRight: (
        <Icon color="gray" underlayColor="grey" name="close" containerStyle={{ padding: 15 }} onPress={() => navigation.state.params.handleClearForm()} />
      ),
      headerLeft: () => (<View></View>),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        fontWeight: "bold"
      }
    };
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ handleClearForm: this.clearState.bind(this) });
  }

  clearState() {
    this.props.clearNewTripState()
    this.props.navigation.popToTop()
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  tripObjectiveOnchange = (text: any) => {
    this.props.setTripObjective(text)
  }

  _goToSearchScreen = async (
    topic: "Traveler" | "FromLocation" | "DestinationLocation" | "ClearanceStaff",
    setField: (arg: string) => void,
  ) => {
    Keyboard.dismiss()
    this.props.navigation.navigate("Search", {
      searchType: topic,
      setField,
    })
  }

  removeDestinationItem = (locationId: any) => {
    ActionSheet.showActionSheetWithOptions({
      options: ASMenu,
      tintColor: 'blue'
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.removeDestinationItem(parseInt(locationId))
        }
      });
  }

  openDatePicker = (mode: string, field: string) => {
    this.props.toggleShowDatePicker(true, mode, field);
  }

  onTravelTypeChange = (value: string | undefined) => {
    this.props.setTravelType(value);
  }

  onClearanceStaffItemPress(id: any) {
    ActionSheet.showActionSheetWithOptions({
      options: ASMenu,
      tintColor: 'blue'
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.removeClearanceStaffItem(id)
        }
      });
  }

  createNewTrip = () => {
    this.props.createTrip()
    this.props.navigation.popToTop()
  }

  onSubmitForm = async (values: any, actions: any) => {
    const formData = {
      trId: 0,
      tvtStaId: '',
      trTravelerId: '',
      trTravellingDate: values.tripDestination.date.getTime(),
      trReturnDate: values.returnDate.date.getTime(),
      trPreparerId: '',
      trObjective: values.tripObjective,
      trFromId: '',
      tripClearanceStaff: '',
      tripDestination: ''
    }
    console.log('values', values)
    console.log('formData', formData)
    // this.props.createTrip(formData)
    this.props.navigation.popToTop()
  }

  render() {
    const { NewTripScreenState } = this.props
    console.log('props', this.props)
    const initialValues = {
      travelerName: '',
      tripObjective: '',
      travelType: '',
      trFrom: '',
      tripDestination: [],
      travellingDate: {
        date: new Date(),
        isSelected: false,
      },
      returnDate: {
        date: new Date(),
        isSelected: false
      },
    }

    return (
      <Formik
        // enableReinitialize
        initialValues={initialValues}
        validateOnBlur={this.state.isSubmited}
        validateOnChange={this.state.isSubmited}
        // validationSchema={validation}
        validate={validation}
        onSubmit={this.onSubmitForm}
      >
        {({
          handleChange,
          values,
          setFieldValue,
          handleSubmit,
          errors,
          handleBlur,
          setFieldTouched,
          touched,
          ...formikProps
        }: any) => {
          console.log('formikProps', formikProps)
          console.log('errors', errors)
          console.log('values', values)
          return (
            <Container style={{ flex: 1, justifyContent: 'flex-start', borderTopWidth: 2, borderTopColor: "#1C7CD5" }}>
              <Content>
                <View style={{ margin: 20, marginBottom: 10 }}>
                  <Form>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        marginVertical: 8,
                        height: 50,
                        borderRadius: 50,
                        borderTopWidth: 2,
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderBottomWidth: 2,
                        borderColor: touched.travelerName && errors.travelerName ? '#D9534F' : '#AEB3B8',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 26,
                      }}
                      onPressOut={() => setFieldTouched('travelerName')}
                      onPress={(e) => {
                        this._goToSearchScreen('Traveler', (data: any) => {
                          const value = data.firstName + data.sureName
                          setFieldValue('travelerName', value)
                        })
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#AEB3B8'
                        }}
                      >
                        {values.travelerName || 'Traveler'}
                      </Text>
                      <Icon name="search" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                    </TouchableOpacity>
                    <ErrorMessage
                      errors={{
                        touched: touched.travelerName,
                        message: errors.travelerName
                      }}
                    />
                    <View
                      style={{
                        paddingVertical: 8,
                      }}
                    >
                      <Input
                        style={{
                          paddingLeft: 25,
                          paddingRight: 25,
                          borderRadius: 50,
                          borderWidth: 2,
                          borderColor: touched.tripObjective && errors.tripObjective ? '#D9534F' : '#AEB3B8',
                        }}
                        placeholderTextColor='#AEB3B8'
                        placeholder='Trip Objective'
                        label={values.tripObjective}
                        onBlur={() => setFieldTouched('tripObjective')}
                        onChangeText={(text) => {
                          setFieldValue('tripObjective', text)
                          this.tripObjectiveOnchange(text)
                        }}
                      />
                    </View>
                    <ErrorMessage
                      errors={{
                        touched: touched.tripObjective,
                        message: errors.tripObjective
                      }}
                    />

                    <View
                      // activeOpacity={1}
                      style={{
                        marginVertical: 8,
                        height: 50,
                        borderRadius: 50,
                        borderWidth: 1.5,
                        borderColor: '#AEB3B8',
                      }}
                    >
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{
                          marginLeft: 20,
                          borderRadius: 50,
                          borderWidth: 2,
                          borderColor: '#AEB3B8',
                        }}
                        onTouchStart={() => setFieldTouched('travelType')}
                        selectedValue={values.travelType}
                        onValueChange={(value) => {
                          if (!value) return
                          setFieldValue('travelType', value)
                        }}
                      >
                        <Picker.Item color='#AEB3B8' label="Travel Type" value='' />
                        <Picker.Item label="International" value='200' />
                        <Picker.Item label="Domestic" value='201' />
                      </Picker>
                    </View>
                    <ErrorMessage
                      errors={{
                        touched: touched.travelType,
                        message: errors.travelType
                      }}
                    />
                    <View style={{ marginVertical: 8, height: 50 }} >
                      <TouchableOpacity
                        onPressOut={() => { setFieldTouched('trFrom') }}
                        style={{
                          height: 50,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: (touched.trFrom && errors.trFrom) ? '#D9534F' : '#AEB3B8',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingLeft: 26,
                        }}
                        onPress={() => {
                          this._goToSearchScreen('FromLocation', (data: any) => {
                            setFieldValue('trFrom', data.title)
                          })
                        }}
                      >
                        <Text style={{ fontSize: 18, color: '#AEB3B8' }}>{values.trFrom || 'From'}</Text>
                        <Icon name="search" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                      </TouchableOpacity>
                      <ErrorMessage
                        errors={{
                          touched: touched.trFrom,
                          message: errors.trFrom
                        }}
                      />
                    </View>
                    <View style={{ marginVertical: 8 }}>
                      {
                        values.tripDestination.length ?
                          <Item
                            rounded
                            style={{
                              marginVertical: 8,
                              flexDirection: 'row',
                              flexWrap: 'wrap',
                              borderColor: '#5CB85C',
                              borderTopWidth: 2,
                              borderLeftWidth: 2,
                              borderRightWidth: 2,
                              borderBottomWidth: 2
                            }}>
                            <View style={{ flex: 1 }}>
                              {
                                values.tripDestination.map((item: any) =>
                                  <View
                                    style={{
                                      padding: 10,
                                      flexDirection: 'row',
                                      justifyContent: "space-between",
                                      borderBottomWidth: 1,
                                      borderColor: "#AEB3B8"
                                    }}
                                    key={item.locationId}
                                  >
                                    <Icon
                                      name="remove-circle"
                                      iconStyle={{ color: "#D9534F", paddingLeft: 10 }}
                                      onPress={() => this.removeDestinationItem(item.locationId)}
                                    />
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontSize: 18,
                                        marginLeft: 10,
                                        flex: 1,
                                        textAlign: "left"
                                      }}
                                    >
                                      {item.title}
                                    </Text>
                                    <Icon
                                      name="menu"
                                      iconStyle={{
                                        color: "#AEB3B8",
                                        paddingRight: 10
                                      }}
                                    />
                                  </View>
                                )
                              }
                              <TouchableOpacity
                                style={{
                                  height: 50,
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                                onPress={() => {
                                  this._goToSearchScreen('DestinationLocation', (data: any) => {
                                    setFieldValue('tripDestination', values.tripDestination.concat(data))
                                  })
                                }}
                              >
                                <Icon name="add-circle-outline" color="#AEB3B8" containerStyle={{ paddingRight: 15, marginLeft: 10 }}></Icon>
                                <Text style={{ color: '#AEB3B8', fontSize: 16 }}>
                                  Add more destination
                              </Text>
                              </TouchableOpacity>
                            </View>
                          </Item>
                          : (
                            <View style={{ marginVertical: 8, height: 50, }} >
                              <TouchableOpacity
                                style={{
                                  height: 50,
                                  borderRadius: 50,
                                  borderTopWidth: 2,
                                  borderLeftWidth: 2,
                                  borderRightWidth: 2,
                                  borderBottomWidth: 2,
                                  borderColor: (touched.tripDestination && errors.tripDestination) ? '#D9534F' : '#AEB3B8',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  paddingLeft: 26,
                                }}
                                onPressIn={() => setFieldTouched('tripDestination')}
                                onPress={() => {
                                  this._goToSearchScreen('DestinationLocation', (data: any) => {
                                    setFieldValue('tripDestination', values.tripDestination.concat(data))
                                  })
                                }}
                              >
                                <Text style={{ fontSize: 18, color: '#AEB3B8' }}>Destination</Text>
                                <Icon name="add" color="#AEB3B8" containerStyle={{ paddingRight: 15, marginLeft: 10 }} />
                              </TouchableOpacity>
                              <ErrorMessage
                                errors={{
                                  touched: touched.tripDestination,
                                  message: errors.tripDestination
                                }}
                              />
                            </View>
                          )
                      }
                    </View>

                    <TouchableOpacity
                      style={{
                        marginVertical: 8,
                        height: 50,
                        borderRadius: 50,
                        paddingLeft: 20,
                        paddingRight: 5,
                        borderColor: '#AEB3B8',
                        borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onPressOut={() => setFieldTouched('travellingDate')}
                      onPress={() => this.setState({ isTravellingDatePickerShow: true })}
                    >
                      <Text
                        style={{ color: '#AEB3B8', fontSize: 18 }}
                      >
                        {values.travellingDate.isSelected ? Moment(values.travellingDate.date).format('DD/MM/YYYY') : 'Travelling date'}
                      </Text>
                      <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                    </TouchableOpacity>
                    <ErrorMessage
                      errors={{
                        touched: touched.travellingDate,
                        message: errors.travellingDate
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        marginVertical: 8,
                        height: 50,
                        borderRadius: 50,
                        paddingLeft: 20,
                        paddingRight: 5,
                        borderColor: '#AEB3B8',
                        borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onPressOut={() => setFieldTouched('returnDate')}
                      onPress={() => this.setState({ isReturnDatePickerShow: true })}
                    >
                      <Text style={{ color: '#AEB3B8', fontSize: 18 }}>
                        {values.returnDate.isSelected ? Moment(values.returnDate.date).format('DD/MM/YYYY') : 'Reture date'}
                      </Text>
                      <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                    </TouchableOpacity>
                    <ErrorMessage
                      errors={{
                        touched: touched.returnDate,
                        message: errors.returnDate
                      }}
                    />
                  </Form>
                </View>
                <View style={{ marginLeft: 40 }}>
                  <Text style={{ fontSize: 18 }}>
                    Clearance Staff
                  </Text>
                </View>
                <View style={{ margin: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                  {NewTripScreenState.tripClearanceStaffDisplay
                    ? NewTripScreenState.tripClearanceStaffDisplay.map((item: any) => (
                      <TouchableHighlight
                        underlayColor='#707070'
                        style={{
                          width: 70,
                          height: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          borderWidth: 6,
                          borderRadius: 50,
                          borderColor: '#472F92',
                          marginLeft: 15,
                          marginTop: 15,
                        }}
                        key={item.employeeId}
                        onPress={() => this.onClearanceStaffItemPress(item.employeeId)}
                      >
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{item.shortName}</Text>
                      </TouchableHighlight>
                    )) : null
                  }
                  <TouchableHighlight
                    style={{
                      width: 70,
                      height: 70,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderWidth: 6,
                      borderRadius: 50,
                      borderColor: "#AEB3B8",
                      marginLeft: 15,
                      marginTop: 15
                    }}
                    onPress={() => this._goToSearchScreen('ClearanceStaff', () => { })}
                  >
                    <Icon name="add" size={50} iconStyle={{ color: "#AEB3B8" }} />
                  </TouchableHighlight>
                </View>
                <Button
                  rounded
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: '#533AAF',
                    margin: 20,
                    marginBottom: 30,
                  }}
                  onPress={() => {
                    handleSubmit()
                    this.setState({ isSubmited: true })
                  }}
                >
                  <Text style={{ textAlign: 'center', color: "#FFFFFF" }}>CREATE</Text>
                </Button>
                {this.state.isTravellingDatePickerShow && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={values.travellingDate.date}
                    mode='date'
                    is24Hour
                    display="default"
                    onChange={(e, date) => {
                      if (date) {
                        this.setState({ isTravellingDatePickerShow: false }, () => {
                          setFieldValue('travellingDate', {
                            date,
                            isSelected: true,
                          })
                        })
                      } else {
                        this.setState({ isTravellingDatePickerShow: false })
                      }

                    }}
                  />
                )}
                {this.state.isReturnDatePickerShow && (
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={values.returnDate.date}
                    mode='date'
                    is24Hour
                    display="default"
                    onChange={(e, date) => {
                      if (date) {
                        this.setState({ isReturnDatePickerShow: false }, () => {
                          setFieldValue('returnDate', {
                            date,
                            isSelected: true,
                          })
                        })
                      } else {
                        this.setState({ isReturnDatePickerShow: false })
                      }

                    }}
                  />
                )}

              </Content>
            </Container>
          )
        }
        }
      </Formik >
    );
  }
}

const mapStateToProps = (reduxState: any) => ({
  ...reduxState,
  NewTripScreenState: reduxState.NewTripScreenState,
});

export default connect(
  mapStateToProps, {
  ...NewTripScreenAction,
})(NewTripScreen);
