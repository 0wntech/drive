import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_FAILURE,
    FETCH_CONTACTS_SUCCESS,
    SET_CURRENT_CONTACT,
    SEARCH_CONTACT,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    loadContacts: false,
    contacts: [],
    currentContact: null,
    contactSearchResult: [],
    searchingContacts: false,
    error: null,
    // [
    //     {
    //         name: 'testdata',
    //         webId: 'https://bejow.solid.community/profile/card#me',
    //     },
    //     {
    //         name: 'testdata2',
    //         webId: 'https://bejow.solid.community/profile/card#me',
    //     },
    // ],
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('Contact Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case FETCH_CONTACTS:
            return { ...state, loadContacts: true };
        case FETCH_CONTACTS_SUCCESS:
            return { ...state, loadContacts: false, contacts: payload };
        case FETCH_CONTACTS_FAILURE:
            return { ...state, loadContacts: false, error: payload };
        case SET_CURRENT_CONTACT:
            return { ...state, currentContact: payload };
        case SEARCH_CONTACT:
            return { ...state, searchingContacts: true };
        case SEARCH_CONTACT_SUCCESS:
            return {
                ...state,
                searchingContacts: false,
                contactSearchResult: payload,
            };
        case SEARCH_CONTACT_FAILURE:
            return { ...state, searchingContacts: false, error: payload };
        default:
            return state;
    }
};

// selectors

export const isContact = (state, webId) => {
    for (let i = 0; i < state.contacts.length; i++) {
        if (state.contacts[i].webId === webId) {
            return true;
        }
    }
    return false;
};
