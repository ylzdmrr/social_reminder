import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors,fonts } from '../../style';

class InputProfile extends Component {
  state = {
    showRightIcon: false
  }

  render() {
    const { placeholder, rightIcon, 
      showRightIcon, onChangeText, 
      value, onPressIcon, secureTextEntry } = this.props;
    return (
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={(value) => {
            onChangeText(value)
            if(value.length > 0) {
              this.setState({ showRightIcon: true  })
              onChangeText(value);
            } else {
              this.setState({ showRightIcon: false  })
            }
          }}
          underlineColorAndroid=  "transparent"
        />
        {this.state.showRightIcon && showRightIcon ?
          <Icon onPress={onPressIcon} style={styles.searchIcon} name={rightIcon} size={15} color="#000" /> :
          null

        }
      </View>
    );
  }
}
const styles = {
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.mainpink,
    height: 50,
    width: '100%',
    marginBottom: 10,

  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding:5,
    backgroundColor: '#fff',
    color: '#424242',
    fontFamily: fonts.text
  },
}

export { InputProfile };
