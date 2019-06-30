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
  } from '../actions/types'; 

const INITIAL_STATE = {
    loading: false,
    isAdd:false,
    contacts: []
  };
  export default (state = INITIAL_STATE, action) => {
      console.log('payload',action.type);
      
    switch (action.type) {
    case ADD_CONTACTS_START,GET_CONTACT_START,GET_USER_CONTACT_START:
          return { ...state, loading: true
        };
        case ADD_CONTACTS_SUCCESS:
            return { ...state, loading: false,isAdd:true, contacts: [action.payload, ...state.contacts]
          };
        case ADD_CONTACTS_FAILD,GET_CONTACT_FAILD,GET_USER_CONTACT_FAILD:
            return { ...state, loading: false,
          };
        case GET_CONTACT_SUCCESS:
            console.log('success çalıştı');
            
            return { ...state, loading: false,isAdd:true,contacts:action.payload
          };
        case GET_CONTACT_ISADD:
            return { ...state, loading: false, isAdd:false
          };
        case GET_USER_CONTACT_SUCCESS:
            return { ...state, loading: false,isAdd:true, contacts: action.payload
          };
    default:
        return state;
    }
  };