import React, { Component } from 'react';
import { Fab, Row, DatePicker } from 'native-base';
import {Icon} from 'native-base';
import { AsyncStorage,View, Text, ScrollView, TouchableOpacity, Image, Datepic } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { colors,fonts } from '../style';
import {Button} from '../components/Common/Button'
import { InputProfile } from './Common/InputProfile';
import { firestore,firebase } from 'react-native-firebase';

class Profile extends Component {

  state = {
    avatarSource:'',
    name: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    birthday: ''
  }
  componentWillMount() {
    AsyncStorage.getItem('selectContact')
    .then(req=>JSON.parse(req))
    .then(json=>{
        console.log('Gelen item: ',json);
        if(json!==null){
           const {givenName,middleName,familyName,thumbnailPath,phoneNumbers,emailAddresses}=json;
           const number = phoneNumbers.map((val, key) => { if (key === 0) return val.number });
           const email = emailAddresses.map((val, key) => { if (key === 0) return val.email });
           const givenname=givenName===null ? '' : givenName;
           const middlename=middleName===null ? '' : middleName;
           const familyname=familyName===null ? '' : familyName;
           this.setState({
              avatarSource:thumbnailPath,
              name:givenname+' '+middlename,
              lastname:familyname,
              email:email.toString(),
              phone:number.toString().substring(0,number.toString().length-1)
           });
        }
        else {

        }
    }).done();
}
  selectPhoto() {
    const options = {
        title: 'Profil Fotoğrafı Seçiniz',
        quality: 0.1,
        takePhotoButtonTitle: 'Resim Çek',
        chooseFromLibraryButtonTitle: 'Galeriden Seç',
        cancelButtonTitle: 'Kapat',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    ImagePicker.showImagePicker(options, async (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            const uri = response.uri;
            console.log('uri:',uri);
            
            this.setState({
                avatarSource: uri,
            });
            this.props.profileImageUpload(uri);
        }
    });
}

componentDidMount(){
  console.log('Profile gelen props degerlerim: ',this.props);
  const {profile_url,username,name,lastname}=this.props.user_data;
  this.setState({
      avatarSource:profile_url,
      userName:username,
      name:name,
      lastName:lastname
  });
}
render() {
    return (
    
        <ScrollView style={{ backgroundColor: '', padding: 40 }}>
            <View style={{ flexDirection:"row", justifyContent:"center", alignItems:"center" }}>
            {
                this.state.avatarSource !== '' ?
                    <TouchableOpacity onPress={() => this.selectPhoto()} >
                        <Image
                            source={{ uri: this.state.avatarSource }}
                            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, marginBottom:10 }}
                        />
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity onPress={() => this.selectPhoto()}>
                          <Image
                            source={require('../images/1-DefaultImage.jpg')}
                            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, marginBottom:10 }}
                            />
                    </TouchableOpacity>
            }
            </View>
           
            <InputProfile
              placeholder={'Ad'}
              rightIcon={'close'}
              showRightIcon
              value={this.state.name}
              onChangeText={(name) => { this.setState({ name }) }}
              onPressIcon={() => console.log('icona tik')}
            />
            <InputProfile
              placeholder={'Soyad'}
              rightIcon={'close'}
              showRightIcon
              value={this.state.lastname}
              onChangeText={(lastname) => { this.setState({ lastname }) }}
              onPressIcon={() => console.log('icona tik')}
            />

           <InputProfile
             placeholder={'Kullanıcı Adı'}
             rightIcon={'close'}
             showRightIcon
             value={this.state.username}
             onChangeText={(username) => { this.setState({ username }) }}
             onPressIcon={() => console.log('icona tik')}
           />

           <InputProfile
             placeholder={'E-posta'}
             rightIcon={'close'}
             showRightIcon
             value={this.state.email}
             onChangeText={(email) => { this.setState({ email }) }}
             onPressIcon={() => console.log('icona tik')}
           />

           {/* <InputProfile
             placeholder={'Doğum Tarihi'}
             rightIcon={'close'}
             secureTextEntry
             showRightIcon={false}
             value={this.state.birthday}
             onChangeText={(birthday) => { this.setState({ birthday }) }}
             onPressIcon={() => console.log('icona tik')}
           /> */}
            <View 
            style={{borderBottomWidth: 1,
            borderBottomColor: colors.mainpink,
            height: 50,
            width: '100%',
            marginBottom: 10, flex: 1,
            padding:5,
            backgroundColor: '#fff',
            color: '#424242',
            fontFamily: fonts.text}}>
            
            <DatePicker
              defaultDate={Date.now()}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"tr"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Doğum Tarihi"
              textStyle={{  color: '#424242',
                            fontFamily: fonts.text, fontSize:14,marginLeft:-10 }}
              placeHolderTextStyle={{ color: colors.text, fontSize: 12,marginLeft:-10} }
              onDateChange={(birthday) => { this.setState({ birthday }) }}
              disabled={false}
              value={this.state.birthday}
              />
          </View>

          <InputProfile
             placeholder={'Telefon'}
             rightIcon={'close'}
             showRightIcon={false}
             value={this.state.phone}
             onChangeText={(phone) => { this.setState({ phone }) }}
             onPressIcon={() => console.log('icona tik')}
           />


          <View style={{ flex: 1, justifyContent:'center', alignItems: 'center', paddingRight:60, paddingLeft:60 }}>
              <Button
              title={'Kaydet'}
              onPress={() => this.props.register(
                  this.state.name,
                  this.state.lastname,
                  this.state.username,
                  this.state.email,
                  this.state.phone,
                  this.state.birthday
              )
              }
              style={{backgroundColor: colors.mainblue, marginTop: 20}}
              />
          </View>
        </ScrollView>

    );
  }
}
const mapStateToProps = ({ authResponse }) => {
  return { user_data: authResponse.user }
}

export default connect(mapStateToProps)(Profile)