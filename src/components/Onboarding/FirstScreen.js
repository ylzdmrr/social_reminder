import React,{Component} from 'react';
import {View,Text,AsyncStorage,ActivityIndicator,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SafeAreaView}  from 'react-navigation';
import {colors,fonts} from '../../style';
import {LOGIN_INFO_LOCAL} from '../../actions/types';

import {connect} from 'react-redux';
import {login} from '../../actions';

class FirstScreen extends Component {
    async componentWillMount(){
        // AsyncStorage.getItem(LOGIN_INFO_LOCAL)
        // .then(req=>JSON.parse(req))
        // .then(json=>{
        //     console.log('Login olan kullanıcı: ',json);
        //     if(json!==null){
        //         this.props.login(json.email,json.password)
        //     }
        //     else {

        //     }
        // }).done();
    }
    render(){
        if(this.props.loading){
            return(
                <SafeAreaView style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color={colors.mainpink} />
                </SafeAreaView>
            )
        }
        return(
            <SafeAreaView style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                <View style ={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../images/0-Logo.png')} style={{width:600,height:400}}resizeMode='contain' />
                </View>
                <View style ={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.textStyle} onPress={() => Actions.login()}>Kullanmaya başlayın!</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles={
    textStyle:{
        color: colors.text, 
        fontSize: 25, 
        fontFamily: fonts.text 
    }
}
const mapStateToProps=({authResponse})=>{
    console.log(authResponse);
    return{loading:authResponse.loading}
}

export default connect(mapStateToProps,{login})(FirstScreen)