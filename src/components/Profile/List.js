import React, { Component } from 'react';
import { View} from 'react-native';
import { Icon,ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import moment from 'moment';
import {colors,fonts} from '../../style';

import { addcontact,getcontact } from '../../actions';

class List extends Component {
    render() {
        console.log('Listeye gelen data: ',this.props.dataHome);
        const{name,lastname,birthday}=this.props.dataHome;
        const formatted = moment.unix(birthday.seconds).format('L');
        
        console.log(formatted);
      return (
        <ListItem thumbnail>
            <Left>
                <Thumbnail square source={ require('../../images/1-DefaultImage.jpg') } />
            </Left>
            <Body>
                <Text>{name} {lastname}</Text>
                <View style={{flexDirection:'row'}}>
                <Icon name="bell-ring" type='MaterialCommunityIcons' style={{color:colors.reminder, fontSize:18, marginRight: 10}} />
                <Text note numberOfLines={1} style={{color:colors.reminder, fontSize: 16}}>{formatted}</Text>
                </View>
            </Body>
            <Right>
            <Button transparent>
                <Text>Detay</Text>
            </Button>
            </Right>
        </ListItem>
      );
    }
  }

  export default List