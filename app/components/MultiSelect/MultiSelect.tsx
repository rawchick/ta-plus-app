import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableHighlight} from 'react-native';

let thisObj: any;

export default class MultiSelect extends Component<any, any> {
    constructor(props: any) {
      super(props);

  this.state = {
    selectedItems: {}
  };
}

onItemPressed(item: any) {
    var oldSelectedItems = this.state.selectedItems;
    var itemState = oldSelectedItems[item.key];
    if(!itemState) {
        oldSelectedItems[item.key] = true;
    }
    else {
        var newState = itemState? false: true;
        oldSelectedItems[item.key] = newState;
    }
    this.setState({
        selectedItems: oldSelectedItems,
    });
}

componentDidMount() {
    thisObj = this;
}

getStyle(item: any) {
    try {
        console.log(thisObj.state.selectedItems[item.key]);
        return thisObj.state.selectedItems[item.key]? styles.itemTextSelected : styles.itemText;
    } catch(e) {
        return styles.itemText;
    }
}

render() {
    return (
        <View style={styles.rootView}>
            <FlatList style={styles.list}
                extraData={this.state}
                data={this.props.data}
                  renderItem={({item} : any) => 
                    <TouchableHighlight onPress={this.onItemPressed.bind(this, item)} underlayColor='#f00'>
                        <Text style={this.getStyle(item)}>{item.key}</Text>
                    </TouchableHighlight>
                  }
                />
        </View>
        );
}
}

const styles = StyleSheet.create({
rootView : {

},
itemText: {
    padding: 16,
    color: "#fff"
},
itemTextSelected: {
    padding: 16,
    color: "#fff",
    backgroundColor: '#f00'
},
list: {

}
});