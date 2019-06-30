import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors,fonts} from '../../style';

class Button extends Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} style={[styles.container, this.props.style]}>
            <Text style={styles.text}>{this.props.title}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = {
  container: { 
    height: 45, 
    width: '100%', 
    borderRadius: 5, 
    backgroundColor: colors.mainblue, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  text: { 
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.text,
  }
}

export { Button };
