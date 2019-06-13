import React, { Component } from 'react';
import { Platform, FlatList,PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import Item from '../components/Common/Item';

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

      render() {
        return (
          <FlatList
            style={{ width: '100%'}}
            data={this.state.contacts.sort((a, b) => a.givenName.localeCompare(b.givenName))}
            renderItem={({item, index}) => <Item 
                        data={item}
                        index={index}
                        />}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      }
    }
 
