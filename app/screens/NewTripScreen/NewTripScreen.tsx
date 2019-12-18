import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import { Container, Form, Content, Item, Input, Icon, Picker, DatePicker, Button } from 'native-base'

class NewTripScreen extends Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            selected: undefined
        };
        this.setDate = this.setDate.bind(this);
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    setDate(newDate: any) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{ flex: 1, justifyContent: 'flex-start', marginTop: 10 }}>
                <Content>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 22, textAlign: 'center', }}>New Trip</Text>
                        <Icon name="ios-close"
                            style={{
                                color: "#636363",
                                textAlign: 'right',
                                position: 'absolute',
                                left: 0,
                                right: 15,
                                top: 0,
                                bottom: 0,
                                fontSize: 35,
                                fontWeight: 'bold'
                            }}
                            onPress={() => goBack(null)}
                        />
                    </View>

                    <View style={{ margin: 15, marginBottom: 30 }}>
                        <Form>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input style={{ marginLeft: 20 }} placeholder='Traveler' />
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input style={{ marginLeft: 20 }} placeholder='Trip Objective' />
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: 120, marginLeft: 20 }}
                                    placeholder="From"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="From" value="" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                </Picker>
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: 120, marginLeft: 20 }}
                                    placeholder="Destination"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholderStyle={{ color: "#d3d3d3" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label="Destination" value="" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                </Picker>
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Traveling Date"
                                    textStyle={{ color: "black", marginLeft: 20 }}
                                    placeHolderTextStyle={{ color: "#d3d3d3", marginLeft: 20 }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Return Date"
                                    textStyle={{ color: "black", marginLeft: 20 }}
                                    placeHolderTextStyle={{ color: "#d3d3d3", marginLeft: 20 }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: 120, marginLeft: 20 }}
                                    placeholder="Travel Type"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholderStyle={{ color: "#d3d3d3" }}
                                    placeholderIconColor="#007aff"
                                >
                                    <Picker.Item label="Travel Type" value="" />
                                    <Picker.Item label="ATM Card" value="key1" />
                                    <Picker.Item label="Debit Card" value="key2" />
                                    <Picker.Item label="Credit Card" value="key3" />
                                    <Picker.Item label="Net Banking" value="key4" />
                                </Picker>
                            </Item>
                            <Item rounded style={{ marginBottom: 15 }}>
                                <Input style={{ marginLeft: 20 }} placeholder='Clearance Staff' />
                            </Item>
                        </Form>
                    </View>
                    <View style={{ margin: 15, marginBottom: 30 }}>
                        <Button success rounded style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}><Text style={{ textAlign: 'center' }}> CREATE </Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default NewTripScreen;