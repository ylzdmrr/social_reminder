import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ContactsReducers from './ContactsReducers';

export default combineReducers({
    authResponse: AuthReducers,
    contactsResponse: ContactsReducers
});