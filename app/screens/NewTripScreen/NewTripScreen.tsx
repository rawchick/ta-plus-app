import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Keyboard, TouchableHighlight, TextInput } from 'react-native';
import { Container, Form, Content, Item, Input, Picker, DatePicker, Button } from 'native-base'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import NewTripScreenAction from './NewTripScreenAction'
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const mapStateToProps = (reduxState: any) => ({
    ...reduxState,
    NewTripScreenState: reduxState.NewTripScreenState
})

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
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    setReturnDate(event: any, newDate: any) {
        if (newDate !== undefined) {
            this.props.setReturnDate(newDate);
        }
    }

    setTravellingDate(event: any, newDate: any) {
        if (newDate !== undefined) {
            this.props.setTravellingDate(newDate);
        }
    }

    _goToSearchScreen(topic: "Traveler" | "FromLocation" | "DestinationLocation" | "Staff") {
        Keyboard.dismiss()
        this.props.navigation.navigate("Search", topic)
    }

    openDatePicker(mode: string, field: string) {
        this.props.toggleShowDatePicker(true, mode, field);
    }

    render() {
        console.log(this.props.NewTripScreenState)
        return (
            <Container style={{ flex: 1, justifyContent: 'flex-start', borderTopWidth: 2, borderTopColor: "#533AAF" }}>
                <Content>
                    <View style={{ margin: 20, marginBottom: 10 }}>
                        <Form>
                            <Item rounded style={{ marginBottom: 15, height: 40 }} onPress={() => this._goToSearchScreen('Traveler')}>
                                <Input style={{ marginLeft: 20 }} placeholder='Traveler' disabled value={this.props.NewTripScreenState.trTravellerName} />
                                <Icon name="search" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>

                            <Item rounded style={{ marginBottom: 15, height: 45 }}>
                                <Input style={{ marginLeft: 20 }} placeholder='Trip Objective' />
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 45 }}>
                                <Input style={{ marginLeft: 20 }} placeholder='Travel Type' />
                                <Icon type="ionicon" name="ios-arrow-down" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 45 }} onPress={() => this._goToSearchScreen('FromLocation')}>
                                <Input style={{ marginLeft: 20 }} placeholder='From' disabled value={this.props.NewTripScreenState.trFromText} />
                                <Icon name="search" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 45 }} onPress={() => this._goToSearchScreen('DestinationLocation')}>
                                <Input style={{ marginLeft: 20 }} placeholder='Destination' disabled />
                                <Icon name="add" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 45 }} onPress={() => this.openDatePicker('date', 'isTravellingDatePickerShow')}>
                                <Input style={{ marginLeft: 20 }} placeholder='Travelling Date' disabled value={this.props.NewTripScreenState.isTravellingDateChanged ? Moment(this.props.NewTripScreenState.trTravellingDate).format('DD/MM/YYYY') : this.props.NewTripScreenState.trTravellingDate} />
                                <Icon type="ionicon" name="ios-calendar" color="#AEB3B8" containerStyle={{ paddingRight: 15 }}></Icon>
                            </Item>
                            <Item rounded style={{ marginBottom: 15, height: 45 }} onPress={() => this.openDatePicker('date', 'isReturnDatePickerShow')}>
                                <Input style={{ marginLeft: 20 }} placeholder='Return Date' disabled value={this.props.NewTripScreenState.isReturnDateChanged ? Moment(this.props.NewTripScreenState.trReturnDate).format('DD/MM/YYYY') : this.props.NewTripScreenState.trReturnDate} />
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
                    <View style={{ margin: 20 }}>
                        <TouchableHighlight style={{
                            width: 70,
                            height: 70,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            borderWidth: 6,
                            borderRadius: 100,
                            borderColor: "#AEB3B8"
                        }} onPress={() => this._goToSearchScreen('Staff')} >
                            <Icon name="add" size={50} iconStyle={{ color: "#AEB3B8" }} />
                        </TouchableHighlight>
                    </View>
                    <View style={{ margin: 20, marginBottom: 30 }}>
                        <Button rounded style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: 50,
                            backgroundColor: '#533AAF'
                        }}><Text style={{ textAlign: 'center', color: "#FFFFFF" }}> CREATE </Text></Button>
                    </View>
                    {this.props.NewTripScreenState.isReturnDatePickerShow && <DateTimePicker value={this.props.NewTripScreenState.trReturnDate}
                        mode={this.props.NewTripScreenState.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setReturnDate} />
                    }
                    {this.props.NewTripScreenState.isTravellingDatePickerShow && <DateTimePicker value={this.props.NewTripScreenState.trTravellingDate}
                        mode={this.props.NewTripScreenState.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setTravellingDate} />
                    }
                </Content>
            </Container>
        );
    }
}

export default connect(mapStateToProps, { ...NewTripScreenAction })(NewTripScreen);