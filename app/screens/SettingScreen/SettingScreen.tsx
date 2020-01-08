import styles from './styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Text, ListItem, Icon, Image, Divider } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import SettingScreenAction from './SettingScreenAction';

const list = [
  {
    title: 'My Profile',
    icon: 'av-timer'
  },
  {
    title: 'Notifications',
    icon: 'flight-takeoff'
  },
]

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const mapStateToProps = (reduxState: any) => ({
  ...reduxState,
  SettingScreenState: reduxState.SettingScreenState
})


class SettingScreen extends Component<any> {
  constructor(props: any) {
    super(props);
    this.editProfileImage = this.editProfileImage.bind(this)
    this._logout = this._logout.bind(this)
  }

  async _logout() {
    await this.props.Logout()
    this.props.navigation.navigate('Starter');
  }

  editProfileImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  }

  render() {
    const informations = [
      {
        title: 'Report A Problem',
        icon: 'info'
      },
      {
        title: 'Help Center',
        icon: 'help'
      },
      {
        title: 'Logout',
        icon: 'exit-to-app',
        onPress: this._logout
      },
    ]

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container1}>
          <View style={{ borderRadius: 50 }}>
            <Image
              source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
              style={{
                width: 150, height: 150
              }}
              PlaceholderContent={<ActivityIndicator />}
              containerStyle={{ borderRadius: 50, overflow: 'hidden' }}
            />
            <Icon size={35} name={'edit'} containerStyle={styles.editIcon} onPress={this.editProfileImage} />
          </View>
          <Text style={styles.sayhiText}>Hello User</Text>
        </View>
        <View style={styles.container2}>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
            <TouchableHighlight style={styles.bodyHeaderTextBox}>
              <Text style={styles.bodyHeaderText}>Upcoming Trip</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.bodyHeaderTextBox}>
              <Text style={styles.bodyHeaderText}>Waiting for your approval</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.container3}>
          <View style={{ marginBottom: 15 }}>
            {
              list.map((item, i) => (
                <ListItem
                  containerStyle={{ backgroundColor: '#ECECEC' }}
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                  chevron
                />
              ))
            }
          </View>

          <Text style={styles.bodyHeaderGroupText}>Information</Text>
          <View
            style={{
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              marginRight: 10,
              marginLeft: 10
            }}
          />
          <View style={{ marginBottom: 15 }}>
            {
              informations.map((item, i) => {
                console.log(item)
                return (
                  <ListItem
                    containerStyle={{ backgroundColor: '#ECECEC' }}
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon }}
                    chevron
                    onPress={item.onPress}
                  />
                )
              })
            }
          </View>
          <Text style={styles.bodyHeaderGroupText}>App Version 1.0</Text>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, { ...SettingScreenAction })(SettingScreen);