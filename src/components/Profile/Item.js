import React, { Component } from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';
import {connect} from 'react-redux';
import {colors,fonts} from '../../style';

import { getcontact } from '../../actions';

class Item extends Component {
    render() {
      const{givenName,middleName,familyName}=this.props.dataContact;
      return (
        <TouchableOpacity onPress={()=> 
          {
            this.props.getcontact(this.props.dataContact);
          }}>
        <View style={{padding:15, borderBottomWidth:0.5,borderBottomColor:'8D8888'}} >
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
           <Text style={{color:colors.text, fontFamily:fonts.text, fontSize:17}}>{givenName} {middleName} {familyName}</Text>
            <Icon name="arrow-forward" style={{color:colors.reminder}}  />
          </View>
      </View>
      </TouchableOpacity>
      );
    }
  }

  const mapStateToProps = ({ contactsResponse }) => {
    return { data: contactsResponse.contacts }
  }
  
  export default connect(mapStateToProps,{getcontact})(Item)