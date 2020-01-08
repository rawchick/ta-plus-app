import styles from './styles';
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

class HomeCardItem extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { source, handlePress, header, subHeader } = this.props
        return (
            <TouchableOpacity onPress={handlePress}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={source} />
                            <Body>
                                <Text>{header}</Text>
                                <Text note>{subHeader}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

export default HomeCardItem;