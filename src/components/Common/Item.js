import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem, Text, Left, Right, Icon } from 'native-base';
import {colors,fonts} from '../../style';

export default class Item extends Component {
    render() {
      const{givenName,middleName,familyName}=this.props.data
      return (
        <ListItem onPress={()=> 
          {
           AsyncStorage.setItem('selectContact', JSON.stringify(this.props.data));
           Actions.profile();
          }}>
          <Left>
            <Text style={{color:colors.text, fontFamily:fonts.text}}>{givenName} {middleName} {familyName}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" style={{color:colors.reminder}}  />
          </Right>
      </ListItem>
      );
    }
  }