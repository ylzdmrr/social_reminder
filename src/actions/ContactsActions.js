import { Alert,AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
    ADD_CONTACTS_START,
    ADD_CONTACTS_SUCCESS,
    ADD_CONTACTS_FAILD,

    GET_CONTACT_START,
    GET_CONTACT_SUCCESS,
    GET_CONTACT_FAILD,
    GET_CONTACT_ISADD,

    GET_USER_CONTACT_START,
    GET_USER_CONTACT_SUCCESS,
    GET_USER_CONTACT_FAILD

} from './types';

export const addcontact = (params) => {
    return (dispatch) => {
        console.log('params',params);
        Actions.pop();
        dispatch({ type: ADD_CONTACTS_START });
        const { name, lastname, email, phone, birthday } = params;
        const { currentUser } = firebase.auth(); 
        const prm = {uid: currentUser.uid, name,lastname,email,phone,birthday};
        firebase.firestore().collection('contacts').add(prm).then(success => {
            console.log('Kayıt başarılı: ', success);
            AsyncStorage.setItem('selectContact', JSON.stringify(null));
            dispatch({ type: ADD_CONTACTS_SUCCESS, payload: prm });
        }).catch(error => {
            console.log('Kayıt başarısız:', error);
            dispatch({ type: ADD_CONTACTS_FAILD });
            Alert.alert('Kişi kaydedilirken bir sorun oluştu lütfen daha sonra tekrar deneyiniz.')
        })
    }
}

const getcontact = (item) => {
    console.log('actiona gelen data:', item);
    const number = item.phoneNumbers.map((val, key) => { if (key === 0) return val.number });
    return (dispatch) => {
        dispatch({ type: GET_CONTACT_START  });
        firebase.firestore().collection('contacts').where('phone', '==', number[0]).get().then((data) => {

            if(data._docs.length===0){
                console.log('item a geldi:',data);
                dispatch({ type: GET_CONTACT_ISADD });
                AsyncStorage.setItem('selectContact', JSON.stringify(item));
                Actions.profile();
              }
              else{
                console.log('else düştü');
                const itemx=data._docs[0]._data;
                dispatch({ type: GET_CONTACT_SUCCESS, payload: itemx });
                AsyncStorage.setItem('selectContact', JSON.stringify(null));
                Actions.profile();
              }

        }).catch(error => {
            console.log('Kişiyi çekerken hata aldık:', error);
            dispatch({ type: GET_CONTACT_FAILD });
        })
    }
}
export {getcontact}

export const getAllContacts = (uid) => {
    return (dispatch) => {
        dispatch({ type: GET_USER_CONTACT_START });
        firebase.firestore().collection('contacts').where('uid', '==', uid).get().then((contacts) => {
            console.log('gelen data:', data);
            let data = [];
            contacts.forEach((doc) => {
                data.push(doc.data())
            });
            console.log('Kişiler: ', data);
            dispatch({ type: GET_USER_CONTACT_SUCCESS, payload: data });

        }).catch(error => {
            console.log('Kişileri çekerken hata aldık:', error);
            dispatch({ type: GET_USER_CONTACT_FAILD });
        })
    }
}