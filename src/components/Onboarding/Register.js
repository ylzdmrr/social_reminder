import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from '../Common';
import { connect } from 'react-redux';
import { register } from '../../actions';


import { colors, fonts } from '../../style';

class Register extends Component {
  state = {
    showRightIcon: false,
    email: '',
    password: '',
    username: '',
    name: '',
    lastname: '',
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
    console.log(e.endCoordinates.height);
    this.moveBottomView(-e.endCoordinates.height);
    
    console.log('_keyboardDidShow');
  }

  _keyboardWillHide(e) {
    console.log('_keyboardDidHide');
    this.state.animation.setValue(0);
  }

  moveBottomView(height){
    console.log('asdasd');
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
        style={{ flex: 1 }}>

        <View style={{ flex: 1, justifyContent: 'center' }}>
        </View>

        { this.props.loading ?
        <View style={{ flex: 6, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.mainpink} />
        </View>
         : 
         <View style={{ flex: 6, backgroundColor: ''}}>
         <ScrollView style={{ backgroundColor: '', padding: 40 }}>
           <Text style={styles.titleStyle}>Hesabını Oluştur</Text>
           
           <View style={{ flexDirection: 'row', justifyContent:'space-between', backgroundColor: ''}}>
            <Input
              placeholder={'Ad'}
              rightIcon={'close'}
              showRightIcon
              value={this.state.name}
              onChangeText={(name) => { this.setState({ name }) }}
              onPressIcon={() => console.log('icona tik')}
              style={{paddingRight: 15}}
            />
            <Text>  </Text>
            <Input
              placeholder={'Soyad'}
              rightIcon={'close'}
              showRightIcon
              value={this.state.lastname}
              onChangeText={(lastname) => { this.setState({ lastname }) }}
              onPressIcon={() => console.log('icona tik')}
              style={{paddingLeft: 15}}
            />

           </View>

           <Input
             placeholder={'Kullanıcı Adı'}
             rightIcon={'close'}
             showRightIcon
             value={this.state.username}
             onChangeText={(username) => { this.setState({ username }) }}
             onPressIcon={() => console.log('icona tik')}
           />

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
             rightIcon={'close'}
             secureTextEntry
             showRightIcon={false}
             value={this.state.password}
             onChangeText={(password) => { this.setState({ password }) }}
             onPressIcon={() => console.log('icona tik')}
           />

          <View style={{ flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <Button
              title={'Kayıt Ol'}
              onPress={() => this.props.register(
                this.state.name,
                this.state.lastname,
                this.state.username,
                this.state.email,
                this.state.password
              )
              }
              style={{backgroundColor: colors.mainpink, marginTop: 30}}
            />
          </View>
         </ScrollView>

       </View>
         }


      </SafeAreaView>
    );
  }
}

const styles={
  titleStyle:{
    color: colors.mainpink, 
    fontFamily: fonts.text, 
    fontSize: 24, 
    width: '100%', 
    marginBottom: 40, 
    textAlign: 'center'
  }
}

const mapStataToProps = ({ authResponse }) => {
  console.log(authResponse);
  return { loading: authResponse.loading }
}

export default connect(mapStataToProps, { register })(Register)
