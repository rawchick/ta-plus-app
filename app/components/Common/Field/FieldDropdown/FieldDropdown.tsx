import React, { PureComponent, Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Picker } from 'native-base'
import _ from 'lodash'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {},
  inputWrapper: {
    height: 50,
    position: 'relative'
  },
  textInput: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 50,
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#AEB3B8',
  },
  defaultBorder: {
    borderColor: '#AEB3B8'
  },
  borderError: {
    borderColor: '#D9534F'
  },
  validBorder: {
    borderColor: '#5CB85C'
  },
  errorContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red'
  },
  pickerContainer: {
    marginLeft: 20,
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  pickerWrapper: {
    marginVertical: 8,
    height: 50,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#AEB3B8',
  }
})

class FieldDropdown extends Component<any, any> {
  state = {
    selectedValue: ''
  }

  onValueChange = (value: any) => {
    this.setState({ selectedValue: value })
    this.props.onValueChange(value)
  }

  onPress = () => {
    this.props.onBlur()
  }

  renderOptions = () => {
    return (
      this.props.options.map((option: any, index: number) => (
        <Picker.Item
          label={option.label}
          value={option.value}
          color={index === 0 ? '#AEB3B8' : ''}
        />
      ))
    )
  }

  render() {
    const message = _.get(this.props, 'error.message', '')
    const isError = _.get(this.props, 'error.touched', false) && !!message
    const isValid = _.get(this.props, 'error.touched', false) && this.state.selectedValue

    return (
      <View style={[this.props.style]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.onPress}
          style={[
            styles.pickerWrapper,
            isError
              ? styles.borderError
              : isValid
                ? styles.validBorder
                : styles.defaultBorder
          ]}
        >
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.pickerContainer}
            selectedValue={this.state.selectedValue}
            onValueChange={this.onValueChange}
          >
            {this.renderOptions()}
          </Picker>
        </TouchableOpacity>
        {
          isError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {message}
              </Text>
            </View>
          )
        }
      </View >
    )
  }
}

export default FieldDropdown
