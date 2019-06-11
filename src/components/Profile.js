import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Datepic } from 'react-native';
import { Fab, Row } from 'native-base';
import {Icon} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import { colors,fonts } from '../style';
import {Input} from '../components/Common/Input'
import {Button} from '../components/Common/Button'
import { InputProfile } from './Common/InputProfile';

export default class Profile extends Component {

  state = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    birthday: ''
  }
  selectPhoto() {
    const options = {
        title: 'Profil Fotoğrafı Seçiniz',
        quality: 0.1,
        takePhotoButtonTitle: 'Resim Çek',
        chooseFromLibraryButtonTitle: 'Galeriden Seç',
        cancelButtonTitle: 'Kapat',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
  render() {
    return (
    
        <ScrollView style={{ backgroundColor: '', padding: 40 }}>
            <View style={{ flexDirection:"row", justifyContent:"center", alignItems:"center" }}>
            {
                this.state.avatarSource !== '' ?
                <TouchableOpacity
                    onPress={() => this.selectPhoto()}
                >
                    <Image
                        source={{ uri: this.state.avatarSource }}
                        style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1 }}
                    /></TouchableOpacity> :
                <Icon name={'user'} size={40} type='FontAwesome' style={{borderWidth: 1}} onPress={() => this.selectPhoto()} />
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

           <InputProfile
             placeholder={'Doğum Tarihi'}
             rightIcon={'close'}
             secureTextEntry
             showRightIcon={false}
             value={this.state.birthday}
             onChangeText={(birthday) => { this.setState({ birthday }) }}
             onPressIcon={() => console.log('icona tik')}
           />

            <InputProfile
             placeholder={'Telefon'}
             rightIcon={'close'}
             secureTextEntry
             showRightIcon={false}
             value={this.state.phone}
             onChangeText={(phone) => { this.setState({ phone }) }}
             onPressIcon={() => console.log('icona tik')}
           />

            <View style={{ flex: 1, justifyContent:'center', alignItems: 'center'}}>
                <Button
                title={'Güncelle'}
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