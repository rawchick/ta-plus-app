import styles from './styles';
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

class HomeCardItem extends Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity {...this.props}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: 'https://cdn.cnn.com/cnnnext/dam/assets/190419101004-avengers-endgame-3-exlarge-169.jpg' }} />
                            <Body>
                                <Text>NativeBase</Text>
                                <Text note>GeekyAnts</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: 'https://cdn.cnn.com/cnnnext/dam/assets/190419101004-avengers-endgame-3-exlarge-169.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                            </Button>
                        </Left>
                        <Body>

                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

export default HomeCardItem;