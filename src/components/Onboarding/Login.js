import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from '../Common';

import { connect } from 'react-redux';
import { login} from '../../actions';

import { colors,fonts } from '../../style';


class Login extends Component {
  state = {
    showRightIcon: false,
    email: '',
    password: '',
    animation: new Animated.Value(0)
  }
 
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardWillShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardWillHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardWillShow(e) {
    this.moveBottomView(-e.endCoordinates.height);
  }

  _keyboardWillHide(e) {
    this.state.animation.setValue(0);
  }

  moveBottomView(height){
    Animated.timing(this.state.animation, {
        toValue: height,
        duration: 300
      }).start();
  }

  render() {
    const animatedStyles = {
      transform: [{ 
        translateY: this.state.animation,
      }],
    };
    return (
      <SafeAreaView
        forceInset={{ bottom: 'never' }}
        style={{ flex: 1}}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
        
        </View>
        { this.props.loading ?
        <View style={{ flex: 6, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.mainpink} />
        </View>
         : 
        <View style={{flex:6, backgroundColor: ''}}>
          <ScrollView style={{ backgroundColor: '', padding:40 }}>
            <Text style={styles.logoTextStyle}>SOCIAL REMINDER</Text>

            <Input
              placeholder={'E-posta'}
              rightIcon={'close'}
              showRightIcon
              value={this.state.email}
              onChangeText={(email) => { this.setState({ email }) }}
              onPressIcon={() => console.log('icona tik')}
            />

            <Input
              placeholder={'Şifre'}
              secureTextEntry
              rightIcon={'close'}
              showRightIcon={false}
              value={this.state.password}
              onChangeText={(password) => { this.setState({ password }) }}
              onPressIcon={() => console.log('icona tik')}
            />

            <Button
                title={'Giriş Yap'}
                onPress={() => this.props.login(this.state.email, this.state.password)}
            />
            <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.pswTextStyle}>Şifreni mi unuttun?</Text>
            </View>

          </ScrollView>
          <View style ={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.newaccountTextStyle} onPress={() => Actions.register()}>Yeni Hesap Oluştur</Text>
          </View>
        </View>

        }
      </SafeAreaView>
    );
  }
}

const styles={
  logoTextStyle:{
    color: colors.mainpink, 
    fontFamily: fonts.maintitle,
    fontSize: 40, 
    width: '100%', 
    textAlign: 'center',
    marginBottom: 40,
  },
  pswTextStyle:{
    color: colors.mainpink, 
    fontSize: 18, 
    marginTop: 20,
    fontFamily: fonts.text,
  },
  newaccountTextStyle:{
    color: colors.text, 
    fontSize: 20, 
    fontFamily: fonts.text 
  }
}


const mapStataToProps = ({ authResponse }) => {
  console.log(authResponse);
  return { loading: authResponse.loading }
}

export default connect(mapStataToProps, { login })(Login)
