import React, { Component } from 'react';
import { Platform, View, FlatList,PermissionsAndroid } from 'react-native';
import { ListItem, Text, Left, Right, Icon } from 'native-base';
import Contacts from 'react-native-contacts';
import {colors,fonts} from '../style';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contacts: []
        };
      }
    
    async componentWillMount() {
        if (Platform.OS === 'android') {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contacts',
              'message': 'This app would like to view your contacts.'
            }
          ).then(() => {
            this.loadContacts();
          })
        } else {
          this.loadContacts();
        }
    }
    
    loadContacts() {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied'){
            console.warn('Permission to access contacts was denied');
          } else {
            this.setState({ contacts });
          }
        })
      }

  renderItem({ item, index }) {
    const number = item.phoneNumbers.map((val, key) => { if (key === 0) return val.number }); //may be wrongly the save their name only without phonenumber so only i have show first element only
    return (
        <ListItem selected>
          <Left>
            <Text style={{color:colors.text, fontFamily:fonts.text}}>{item.givenName} {item.middleName} {item.familyName}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" style={{color:colors.reminder}} />
          </Right>
        </ListItem>
    );
  }

  render() {
    return (
      <FlatList
      style={{ width: '100%'}}
        data={this.state.contacts.sort((a, b) => a.givenName.localeCompare(b.givenName))}
        renderItem={(a) => this.renderItem(a)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
