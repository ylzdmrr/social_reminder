import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../style';

class Input extends Component {
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
    borderTopWidth: 1,
    borderTopColor: colors.mainblue,
    borderBottomWidth: 1,
    borderBottomColor: colors.mainblue,
    borderLeftWidth: 1,
    borderLeftColor: colors.mainblue,
    borderRightWidth: 1,
    borderRightColor: colors.mainblue,
    borderRadius: 2,
    height: 50,
    width: '100%',
    marginBottom: 20,

  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: '#fff',
    color: '#424242',
  },
}

export { Input };
