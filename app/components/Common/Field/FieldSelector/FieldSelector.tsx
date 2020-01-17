import React, { Component } from 'react'
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { Input, Item } from 'native-base'
import { Icon } from 'react-native-elements'

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
  icon: {
    position: 'absolute',
    right: 16,
    top: 10,
  }
})

type Props = {
  size?: 'large' | 'medium' | 'small'
  value: string
  onPress: () => void
  placeholderTextColor?: string
  placeholder?: string
  onBlur?: () => void
  style?: any
  icon: React.ReactNode
  // error?: {
  //   touched: boolean
  //   message: string
  // }
  error: any
}

class FieldSelector extends React.PureComponent<any, any> {
  onPress = () => {
    console.log('pressss')
    this.props.onPress()
    this.props.onBlur()
  }

  renderIcon = () => {
    return (
      <View style={styles.icon}>
        {this.props.customIcon
          ? this.props.customIcon
          : <Icon name={this.props.icon} color="#AEB3B8" size={30} />}
      </View>
    )
  }

  render() {
    const message = _.get(this.props, 'error.message', '')
    const isError = _.get(this.props, 'error.touched', false) && !!message
    console.log(this.props.value)
    return (
      <View style={[styles.container, this.props.style]}>
        <Item rounded onPress={this.onPress} style={styles.inputWrapper}>
          <Input
            disabled
            style={[
              styles.textInput,
              isError ? styles.borderError : styles.defaultBorder
            ]}
            placeholderTextColor={this.props.placeholderTextColor}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onBlur={this.props.onBlur}
          />
          {this.renderIcon()}
        </Item>
        {isError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {message}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

export default FieldSelector
