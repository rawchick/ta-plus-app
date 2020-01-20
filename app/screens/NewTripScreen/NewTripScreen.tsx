import React, { Component } from 'react'
import {
  Text,
  View,
  Keyboard,
  TouchableHighlight,
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
import styles from './styles'
import { TextInput, FieldSelector, FieldDropdown } from '../../components/Common'

const ASMenu = ['Remove']

const defaultInitialValues = {
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
  clearanceStaff: []
}

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
    this.props.navigation.setParams({
      handleClearForm: this.clearState
    });
  }

  clearState = () => {
    this.props.clearNewTripState()
    this.props.navigation.popToTop()
  }

  tripObjectiveOnchange = (text: any) => {
    this.props.setTripObjective(text)
  }

  _goToSearchScreen = async (
    topic: 'Traveler' | 'FromLocation' | 'DestinationLocation' | 'ClearanceStaff',
    setField: (arg: string) => void,
  ) => {
    Keyboard.dismiss()
    this.props.navigation.navigate('Search', {
      searchType: topic,
      setField,
    })
  }

  removeDestinationItem = (locationId: any, setFieldValue: () => void) => {
    ActionSheet.showActionSheetWithOptions({
      options: ASMenu,
      tintColor: 'blue'
    }, () => {
      if (setFieldValue) {
        setFieldValue()
      }
    });
  }

  openDatePicker = (mode: string, field: string) => {
    this.props.toggleShowDatePicker(true, mode, field);
  }

  onTravelTypeChange = (value: string | undefined) => {
    this.props.setTravelType(value);
  }

  onClearanceStaffItemPress = (id: any, setFieldValue: () => void) => {
    ActionSheet.showActionSheetWithOptions({
      options: ASMenu,
      tintColor: 'blue'
    }, () => {
      if (setFieldValue) {
        setFieldValue()
      }
    })
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
    const initialValues = this.props.initialValuesForm || defaultInitialValues

    return (
      <Formik
        initialValues={initialValues}
        validateOnBlur={this.state.isSubmited}
        validateOnChange={this.state.isSubmited}
        validate={validation}
        onSubmit={this.onSubmitForm}
      >
        {(formikProps) => {
          const {
            values,
            setFieldValue,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          } = formikProps

          return (
            <Container style={styles.container}>
              <Content>
                <View style={styles.formWrapper}>
                  <Form>
                    <FieldSelector
                      style={styles.verticalField}
                      icon='search'
                      placeholderTextColor='#AEB3B8'
                      placeholder='Traveler'
                      onPress={() => {
                        this._goToSearchScreen('Traveler', (data: any) => {
                          const fullName = data.firstName + ' ' + data.sureName
                          setFieldValue('travelerName', fullName)
                        })
                      }}
                      onBlur={() => setFieldTouched('travelerName')}
                      value={values.travelerName}
                      error={{
                        touched: touched.travelerName,
                        message: errors.travelerName
                      }}
                    />
                    <TextInput
                      style={styles.verticalField}
                      value={values.tripObjective}
                      placeholderTextColor='#AEB3B8'
                      placeholder='Trip Objective'
                      onBlur={() => setFieldTouched('tripObjective')}
                      onChangeText={(text) => {
                        setFieldValue('tripObjective', text)
                        this.tripObjectiveOnchange(text)
                      }}
                      error={{
                        touched: touched.tripObjective,
                        message: errors.tripObjective
                      }}
                    />
                    <FieldDropdown
                      onBlur={() => setFieldTouched('travelType')}
                      defaultValue={values.travelType}
                      placeholder="Travel Type"
                      onValueChange={(value: any) => {
                        if (!value) return
                        setFieldValue('travelType', value)
                      }}
                      options={[
                        { label: 'Travel Type', value: '' },
                        { label: 'International', value: '202' },
                        { label: 'Domestic', value: '201' },
                      ]}
                      error={{
                        touched: touched.travelType,
                        message: errors.travelType
                      }}
                    />
                    <FieldSelector
                      style={styles.verticalField}
                      icon='search'
                      placeholderTextColor='#AEB3B8'
                      placeholder='From'
                      onPress={() => {
                        this._goToSearchScreen('FromLocation', (data: any) => {
                          setFieldValue('trFrom', data.title)
                        })
                      }}
                      onBlur={() => setFieldTouched('trFrom')}
                      value={values.trFrom}
                      error={{
                        touched: touched.trFrom,
                        message: errors.trFrom
                      }}
                    />
                    <View style={styles.verticalField}>
                      {
                        values.tripDestination.length ?
                          <Item rounded style={styles.tripDestinationList}>
                            <View style={{ flex: 1 }}>
                              {
                                values.tripDestination.map((item: any, tripDestinationIndex: number) =>
                                  <View key={item.locationId} style={styles.tripDestinationItem}>
                                    <Icon
                                      name="remove-circle"
                                      iconStyle={styles.removeTripDestinationIcon}
                                      onPress={() => {
                                        this.removeDestinationItem(item.locationId, () => {
                                          setFieldValue(
                                            'tripDestination',
                                            values.tripDestination.filter((_: any, i: number) => i !== tripDestinationIndex)
                                          )
                                        })
                                      }}
                                    />
                                    <Text style={styles.tripDestinationText}>
                                      {item.title}
                                    </Text>
                                    <Icon name="menu" iconStyle={{ color: "#AEB3B8", paddingRight: 10 }} />
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
                            <FieldSelector
                              icon='add'
                              placeholderTextColor='#AEB3B8'
                              placeholder='Destination'
                              onPress={() => {
                                this._goToSearchScreen('DestinationLocation', (data: any) => {
                                  setFieldValue('tripDestination', values.tripDestination.concat(data))
                                })
                              }}
                              onBlur={() => setFieldTouched('tripDestination')}
                              value={values.tripDestination}
                              error={{
                                touched: touched.tripDestination,
                                message: errors.tripDestination
                              }}
                            />
                          )
                      }
                    </View>
                    <FieldSelector
                      style={styles.verticalField}
                      customIcon={(
                        <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }} size={30} />
                      )}
                      placeholderTextColor='#AEB3B8'
                      placeholder='Travelling date'
                      onPress={() => this.setState({ isTravellingDatePickerShow: true })}
                      onBlur={() => setFieldTouched('travellingDate')}
                      value={values.travellingDate.isSelected
                        ? Moment(values.travellingDate.date).format('DD/MM/YYYY')
                        : ''
                      }
                      error={{
                        touched: touched.travellingDate,
                        message: errors.travellingDate
                      }}
                    />
                    <FieldSelector
                      style={styles.verticalField}
                      customIcon={(
                        <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }} size={30} />
                      )}
                      placeholderTextColor='#AEB3B8'
                      placeholder='Reture date'
                      onPress={() => this.setState({ isReturnDatePickerShow: true })}
                      onBlur={() => setFieldTouched('returnDate')}
                      value={values.returnDate.isSelected
                        ? Moment(values.returnDate.date).format('DD/MM/YYYY')
                        : ''
                      }
                      error={{
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
                <View style={styles.staffListContainer}>
                  {!!values.clearanceStaff.length
                    ? values.clearanceStaff.map((item: any, staffIndex: number) => (
                      <TouchableHighlight
                        key={item.employeeId}
                        underlayColor='#707070'
                        style={styles.staffImg}
                        onPress={() => {
                          this.onClearanceStaffItemPress(item.employeeId, () => {
                            setFieldValue(
                              'clearanceStaff',
                              values.clearanceStaff.filter((_: any, index: number) => index !== staffIndex)
                            )
                          })
                        }}
                      >
                        <Text style={styles.staffText}>{item.shortName}</Text>
                      </TouchableHighlight>
                    ))
                    : null
                  }
                  <TouchableHighlight
                    style={styles.addStaffBtn}
                    onPress={() => {
                      this._goToSearchScreen('ClearanceStaff', (staff) => {
                        const staffs = values.clearanceStaff.concat(staff).map((_staff: any) => ({
                          ..._staff,
                          shortName: _staff.firstName.slice(0, 1) + '' + _staff.sureName.slice(0, 1)
                        }))
                        setFieldValue('clearanceStaff', staffs)
                      })
                    }}
                  >
                    <Icon name="add" size={50} iconStyle={{ color: "#AEB3B8" }} />
                  </TouchableHighlight>
                </View>
                <Button
                  rounded
                  style={styles.submitBtn}
                  onPress={() => {
                    this.setState({ isSubmited: true }, handleSubmit)
                  }}
                >
                  <Text style={styles.submitText}>Create trip</Text>
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
