import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_FAILURE,
    FETCH_CONTACTS_SUCCESS,
    SET_CURRENT_CONTACT,
    SEARCH_CONTACT,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_FAILURE,
    FETCH_CONTACT_RECOMMENDATIONS,
    FETCH_CONTACT_RECOMMENDATIONS_SUCCESS,
    FETCH_CONTACT_RECOMMENDATIONS_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    loadContacts: false,
    contacts: [],
    contactRecommendations: [],
    currentContact: null,
    contactSearchResult: [],
    searchingContacts: false,
    error: {
        FETCH_CONTACTS: false,
        SEARCH_CONTACT: false,
        FETCH_CONTACT_RECOMMENDATIONS: false,
    },
    loadContactRecommendations: false,
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('Contact Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case FETCH_CONTACTS:
            return {
                ...state,
                loadContacts: true,
                error: { ...state.error, FETCH_CONTACTS: false },
            };
        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                loadContacts: false,
                contacts: payload,
                error: { ...state.error, FETCH_CONTACTS: false },
            };
        case FETCH_CONTACTS_FAILURE:
            return {
                ...state,
                loadContacts: false,
                error: { ...state.error, FETCH_CONTACTS: payload },
            };
        case SET_CURRENT_CONTACT:
            return { ...state, currentContact: payload };
        case SEARCH_CONTACT:
            return {
                ...state,
                searchingContacts: true,
                error: { ...state.error, SEARCH_CONTACT: false },
            };
        case SEARCH_CONTACT_SUCCESS:
            return {
                ...state,
                searchingContacts: false,
                contactSearchResult: payload,
                error: { ...state.error, SEARCH_CONTACT: false },
            };
        case SEARCH_CONTACT_FAILURE:
            return {
                ...state,
                searchingContacts: false,
                error: { ...state.error, SEARCH_CONTACT: payload },
            };
        case FETCH_CONTACT_RECOMMENDATIONS:
            return {
                ...state,
                loadContactRecommendations: true,
                error: { ...state.error, FETCH_CONTACT_RECOMMENDATIONS: false },
            };
        case FETCH_CONTACT_RECOMMENDATIONS_SUCCESS:
            return {
                ...state,
                loadContactRecommendations: false,
                contactRecommendations: payload,
                error: { ...state.error, FETCH_CONTACT_RECOMMENDATIONS: false },
            };
        case FETCH_CONTACT_RECOMMENDATIONS_FAILURE:
            return {
                ...state,
                loadContactRecommendations: false,
                error: {
                    ...state.error,
                    FETCH_CONTACT_RECOMMENDATIONS: payload,
                },
            };
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
