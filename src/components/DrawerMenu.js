import React, {Component} from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {colors,fonts} from '../style';
import {profileImageUpload,logout} from '../actions';  // Actions oluşturulacak
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';

class DrawerMenu extends Component {
    state={
        avatarSource:'',
        userName:'',
        name:'',
        lastName:''
    }
    componentDidMount(){
        console.log('Menuye gelen props degerlerim: ',this.props);
        const {profile_url,username,name,lastname}=this.props.user_data;
        this.setState({
            avatarSource:profile_url,
            userName:username,
            name:name,
            lastName:lastname
        });
    }
    sections(icon, name, onPress) {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '', alignItems: 'center', marginBottom: 20 }}>
                {icon != null ? <Icon name={icon} size={15} style={{width:40, color:colors.mainblue}} type='FontAwesome' /> : null}
                <Text onPress={onPress} style={{ fontSize: 14, marginLeft: 20,color:colors.mainblue, fontFamily:fonts.text }}>{name}</Text>
            </View>
        )
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
        return(
            <SafeAreaView forceInset={{bottom: 'never'}} style={{flex:1}}>
                <View style={styles.view1}>
                    <Text style={styles.logoText}>Social Reminder</Text>
                    <View style={{backgroundColor:'#8D8888', height:0.5, width: '100%'}} />
                </View>

                <View style={styles.view2}>
                    <View>
                         {
                            this.state.avatarSource !== '' ?
                                <TouchableOpacity
                                    onPress={() => this.selectPhoto()}
                                >
                                    <Image
                                        source={{ uri: this.state.avatarSource }}
                                        style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1 }}
                                    /></TouchableOpacity> :
                                <Icon name={'user-circle'} size={40} type='FontAwesome' style={{borderWidth: 1}} onPress={() => this.selectPhoto()} />
                        }
                    </View>
                        <Text style={styles.textStyle}>@{this.state.userName}</Text>
                        <Text style={styles.textStyle}>{this.state.name} {this.state.lastName}</Text>
                    <View style={{backgroundColor:'#8D8888', height:0.5, width: '100%',marginTop:15}} />
                </View>
                
                <View style={{ flex: 7,padding:15}}>
                    <ScrollView >
                        <View>
                            {this.sections('home', 'Anasayfa', () => {
                                const { currentUser } =  firebase.auth();
                                Actions.home({ uid: currentUser.uid })
                            })}
                            {this.sections('user', 'Profil', () => {
                                const { currentUser } =  firebase.auth();
                                Actions.profile({ uid: currentUser.uid })
                            })}
                            {this.sections('bookmark', 'Hatırlatma Seçenekleri')}
                            {this.sections('wrench', 'Uygulama Ayarları')}
                        </View>

                        <View style={{ backgroundColor: 'black', height: 0.5, width: '100%',marginBottom:15}} />
                        
                        <View >
                            {this.sections('close', 'Çıkış Yap',()=>{
                                const { currentUser } =  firebase.auth();
                                this.props.logout(currentUser);
                            })}
                        </View>
                        
                    </ScrollView>
                </View>

            </SafeAreaView>
        );
    }
}

const styles={
    view1:{
        padding: 15,
        height:50,
        justifyContent:'center',
        marginTop:15
    },
    view2:{
        flex:2,
        padding:15,
        justifyContent:'center'
    },
    logoText:{
        color: colors.mainpink,
        fontFamily: fonts.maintitle,
        marginBottom: 5,
        fontSize:18
    },
    textStyle:{
        fontSize: 14, 
        marginTop: 10, 
        fontFamily: fonts.text,
        color: colors.mainpink,
        paddingLeft: 15,
    }
}

const mapStateToProps = ({ authResponse }) => {
    return { user_data: authResponse.user }
}

export default connect(mapStateToProps, { profileImageUpload,logout })(DrawerMenu)