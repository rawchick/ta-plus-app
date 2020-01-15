import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'

class DraggableFlatListComponent extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    renderItem = ({ item, index, drag, isActive }: any) => {
        return (
            <TouchableOpacity
                style={{
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            //onLongPress={drag}
            >
                <Text style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 32,
                }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <DraggableFlatList
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={(index: any) => `draggable-item-${index}`}
                onDragEnd={this.props.handleDragEnd}
            />
        )
    }
}

export default DraggableFlatListComponent