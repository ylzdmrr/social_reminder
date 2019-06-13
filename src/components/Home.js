import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { colors,fonts } from '../style';


export default class Home extends Component {

  state = {
    active: false
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Anasayfa </Text>


        <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: colors.mainblue }}
            position="bottomRight"
            onPress={() =>  Actions.contacts()}>
            <Icon name="plus" />
          </Fab>
      </View>
    );
  }
}
