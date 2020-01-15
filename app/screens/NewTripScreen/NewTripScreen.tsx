import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Keyboard, TouchableHighlight, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Container, Form, Content, Item, Input, Picker, DatePicker, Button } from 'native-base'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import NewTripScreenAction from './NewTripScreenAction'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import ActionSheet from 'react-native-action-sheet';
import DraggableFlatList from '../../components/NewTripScreen/DragableFlatList/DragableFlatList'

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    NewTripScreenState: reduxState.NewTripScreenState
})

const ASMenu = [
    'Remove'
]

class NewTripScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selected: undefined
        };
        this.setTravellingDate = this.setTravellingDate.bind(this)
        this.setReturnDate = this.setReturnDate.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this)
        this._goToSearchScreen = this._goToSearchScreen.bind(this)
        this.tripObjectiveOnchange = this.tripObjectiveOnchange.bind(this)
        this.createNewTrip = this.createNewTrip.bind(this)
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

    tripObjectiveOnchange(text: any) {
        this.props.setTripObjective(text)
    }

    setReturnDate(event: any, newDate: any) {
        if (newDate !== undefined) {
            this.props.setReturnDate(event, newDate);
        }
    }

    setTravellingDate(event: any, newDate: any) {
        if (newDate !== undefined) {
            this.props.setTravellingDate(event, newDate);
        }
    }

    _goToSearchScreen(topic: "Traveler" | "FromLocation" | "DestinationLocation" | "ClearanceStaff") {
        Keyboard.dismiss()
        this.props.navigation.navigate("Search", topic)
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

    openDatePicker(mode: string, field: string) {
        this.props.toggleShowDatePicker(true, mode, field);
    }

    onTravelTypeChange(value: string | undefined) {
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

    createNewTrip() {
        this.props.createTrip()
        this.props.navigation.popToTop()
    }

    render() {
        const { NewTripScreenState } = this.props
        return (
            <Container style={{ flex: 1, justifyContent: 'flex-start', borderTopWidth: 2, borderTopColor: "#1C7CD5" }}>
                <Content>
                    <View style={{ margin: 20, marginBottom: 10 }}>
                        <Form>
                            <Item rounded style={{ marginBottom: 15, height: 50, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }} onPress={() => this._goToSearchScreen('Traveler')}>
                                <Input style={{ marginLeft: 20 }} placeholderTextColor='#AEB3B8' placeholder='Traveler' disabled value={this.props.NewTripScreenState.trTravelerName} />
                                <Icon name="search" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>

                            <Item rounded style={{ marginBottom: 15, height: 50, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }}>
                                <Input style={{ marginLeft: 20 }} placeholderTextColor='#AEB3B8' placeholder='Trip Objective' onChangeText={this.tripObjectiveOnchange} />
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 50, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholder="Travel Type"
                                    placeholderStyle={{ color: "#AEB3B8" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: undefined, marginLeft: 20, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }}
                                    selectedValue={NewTripScreenState.trTravelType}
                                    onValueChange={this.onTravelTypeChange.bind(this)}
                                >
                                    <Picker.Item label="Travel Type" color="#AEB3B8" value={undefined} />
                                    <Picker.Item label="International" value="200" />
                                    <Picker.Item label="Domestic" value="201" />
                                </Picker>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 50, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }} onPress={() => this._goToSearchScreen('FromLocation')}>
                                <Input style={{ marginLeft: 20 }} placeholderTextColor='#AEB3B8' placeholder='From' disabled value={NewTripScreenState.trFromText} />
                                <Icon name="search" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }}>
                                {
                                    NewTripScreenState.tripDestination ?
                                        <View style={{ flex: 1 }}>
                                            {
                                                NewTripScreenState.tripDestinationDisplay.map((item: any) =>
                                                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#AEB3B8" }} key={item.locationId}>
                                                        <Icon name="remove-circle" iconStyle={{ color: "#D9534F", paddingLeft: 10 }} onPress={() => this.removeDestinationItem(item.locationId)} />
                                                        <Text style={{
                                                            color: 'black',
                                                            fontSize: 18,
                                                            marginLeft: 10,
                                                            flex: 1,
                                                            textAlign: "left"
                                                        }}>{item.title}</Text>
                                                        <Icon name="menu" iconStyle={{ color: "#AEB3B8", paddingRight: 10 }} />
                                                    </View>
                                                )
                                            }
                                            <TouchableOpacity style={{
                                                borderTopWidth: 1,
                                                borderColor: "#AEB3B8",
                                                height: 60,
                                                width: "100%",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }} onPress={() => this._goToSearchScreen('DestinationLocation')}>
                                                <Icon name="add-circle-outline" color="#AEB3B8" containerStyle={{ paddingRight: 15, marginLeft: 10 }}></Icon>
                                                <Text style={{ color: '#AEB3B8', fontSize: 16 }}>
                                                    Add more destination
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <>
                                            <Input style={{ marginLeft: 20 }} placeholderTextColor='#AEB3B8' placeholder='Destination' disabled />
                                            <Icon name="add" color="#AEB3B8" containerStyle={{ paddingRight: 15, marginLeft: 10 }} onPress={() => this._goToSearchScreen('DestinationLocation')}></Icon>
                                        </>
                                }
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 50, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }} onPress={() => this.openDatePicker('date', 'isTravellingDatePickerShow')}>
                                <Input style={{ marginLeft: 20 }} placeholderTextColor='#AEB3B8' placeholder='Travelling Date' disabled value={NewTripScreenState.isTravellingDateChanged ? Moment(NewTripScreenState.trTravellingDate).format('DD/MM/YYYY') : NewTripScreenState.trTravellingDate} />
                                <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 50, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2 }} onPress={() => this.openDatePicker('date', 'isReturnDatePickerShow')}>
                                <Input style={{ marginLeft: 20 }} placeholderTextColor='#AEB3B8' placeholder='Return Date' disabled value={NewTripScreenState.isReturnDateChanged ? Moment(NewTripScreenState.trReturnDate).format('DD/MM/YYYY') : NewTripScreenState.trReturnDate} />
                                <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                        </Form>
                    </View>
                    <View style={{ marginLeft: 40 }}>
                        <Text style={{
                            fontSize: 18
                        }}>
                            Clearance Staff
                        </Text>
                    </View>
                    <View style={{ margin: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            NewTripScreenState.tripClearanceStaffDisplay ?
                                NewTripScreenState.tripClearanceStaffDisplay.map((item: any) =>
                                    <TouchableHighlight
                                        underlayColor="#707070"
                                        style={{
                                            width: 70,
                                            height: 70,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#fff",
                                            borderWidth: 6,
                                            borderRadius: 50,
                                            borderColor: "#472F92",
                                            marginLeft: 15,
                                            marginTop: 15
                                        }}
                                        key={item.employeeId}
                                        onPress={() => this.onClearanceStaffItemPress(item.employeeId)}
                                    >
                                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{item.shortName}</Text>
                                    </TouchableHighlight>
                                ) : null
                        }
                        <TouchableHighlight style={{
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
                        }} onPress={() => this._goToSearchScreen('ClearanceStaff')} >
                            <Icon name="add" size={50} iconStyle={{ color: "#AEB3B8" }} />
                        </TouchableHighlight>
                    </View>
                    <Button rounded style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 50,
                        backgroundColor: '#533AAF',
                        margin: 20, marginBottom: 30
                    }} onPress={this.createNewTrip}><Text style={{ textAlign: 'center', color: "#FFFFFF" }}> CREATE </Text></Button>

                    {NewTripScreenState.isReturnDatePickerShow && <DateTimePicker value={NewTripScreenState.trReturnDate}
                        mode={NewTripScreenState.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setReturnDate} />
                    }
                    {NewTripScreenState.isTravellingDatePickerShow && <DateTimePicker value={NewTripScreenState.trTravellingDate}
                        mode={NewTripScreenState.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setTravellingDate} />
                    }
                </Content>
            </Container >
        );
    }
}

export default connect(mapStateToProps, { ...NewTripScreenAction })(NewTripScreen);