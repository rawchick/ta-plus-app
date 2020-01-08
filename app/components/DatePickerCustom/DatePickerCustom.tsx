import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
    date?: Date
    mode: "date" | "time" | "datetime" | undefined
    show: Boolean,
    handleChange: Function
}

export default class DatePickerCustom extends Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { show, date, mode, handleChange } = this.props;

        return (
            <View>
                {show && <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={handleChange()} />
                }
            </View>
        );
    }
}