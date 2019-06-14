import React, { Component } from 'react';
import { View, Text,FlatList } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { colors,fonts } from '../style';
import List from './Profile/List';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {getAllContacts} from '../actions'

class Home extends Component {

  state = {
    active: false
  }

  componentDidMount() {
    const { currentUser } =  firebase.auth();
    const uid=currentUser.uid;
    this.props.getAllContacts(uid);
    console.log('this props', this.props.data);
    
  }

  render() {
    return (
      <View style={{ flex: 1}}>

        <FlatList
          style={{ flex: 1 }}
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <List
              dataHome={item}
              profile_url={null}
            />
          }
        />

        <Fab
          active={this.state.active}
          direction="up"
          style={{ backgroundColor: colors.mainblue }}
          position="bottomRight"
          onPress={() =>  Actions.contacts()}>
          <Icon name="plus" />
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = ({ contactsResponse }) => {
  return { data: contactsResponse.contacts}
}
export default connect(mapStateToProps,{getAllContacts})(Home)