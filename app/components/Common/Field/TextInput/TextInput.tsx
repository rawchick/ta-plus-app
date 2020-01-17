import React, { Component } from 'react'
import { TextInput as TextInputRN, View, Text, StyleSheet } from 'react-native'
import _ from 'lodash'
import { Input, Item } from 'native-base'

const styles = StyleSheet.create({
  container: {

  },
  textInput: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#AEB3B8',
  },
  defaultBorder: {
    borderColor: '#AEB3B8'
  },
  borderError: {
    borderColor: '#D9534F'
  },
  errorContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red'
  }
})

type Props = {
  value: string
  onChangeText: (t: string) => void
  placeholderTextColor?: string
  placeholder?: string
  onBlur?: () => void
  style?: any
  // error?: {
  //   touched: boolean
  //   message: string
  // }
  error: any
}

class TextInput extends React.PureComponent<Props, any> {

  render() {
    const message = _.get(this.props, 'error.message', '')
    const isError = _.get(this.props, 'error.touched', false) && !!message

    return (
      <View style={[styles.container, this.props.style]}>
        <Item rounded style={{ height: 50 }}>
          <Input
            style={[
              styles.textInput,
              isError ? styles.borderError : styles.defaultBorder
            ]}
            placeholderTextColor={this.props.placeholderTextColor}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onBlur={this.props.onBlur}
            onChangeText={this.props.onChangeText}
          />
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

export default TextInput
