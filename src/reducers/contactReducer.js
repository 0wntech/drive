import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_FAILURE,
    FETCH_CURRENT_CONTACTS_SUCCESS,
    FETCH_CONTACTS_SUCCESS,
    SET_CURRENT_CONTACT,
    SEARCH_CONTACT,
    SEARCH_CONTACT_COMPLETED,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_FAILURE,
    FETCH_CONTACT_RECOMMENDATIONS,
    FETCH_CONTACT_RECOMMENDATIONS_SUCCESS,
    FETCH_CONTACT_RECOMMENDATIONS_FAILURE,
    CLEAR_ERROR,
    ADD_CONTACT,
    ADD_CONTACT_FAILURE,
    REMOVE_CONTACT,
    REMOVE_CONTACT_FAILURE,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT,
    REMOVE_CONTACT_SUCCESS,
    ADD_CONTACT_SUCCESS,
} from '../actions/types';
import { getRootFromWebId } from '../utils/url';

const INITIAL_STATE = {
    loadContacts: false,
    contacts: null,
    contactRecommendations: null,
    currentContact: null,
    currentContactRootUrl: null,
    currentContacts: null,
    contactSearchResult: null,
    searchingContacts: false,
    loadCurrentContact: false,
    error: {
        FETCH_CONTACTS: false,
        ADD_CONTACT: false,
        REMOVE_CONTACT: false,
        SEARCH_CONTACT: false,
        FETCH_CONTACT_RECOMMENDATIONS: false,
        FETCH_CONTACT: false,
    },
    loadContactRecommendations: false,
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.info('Contact Reducer got action: ', type, '\nValue: ', payload);

    switch (type) {
        case CLEAR_ERROR:
            return { ...state, error: INITIAL_STATE.error };
        case ADD_CONTACT:
            return {
                ...state,
                error: { ...state.error, ADD_CONTACT: false },
            };
        case ADD_CONTACT_FAILURE:
            return {
                ...state,
                error: { ...state.error, ADD_CONTACT: payload },
            };
        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts, payload],
            };
        case REMOVE_CONTACT:
            return {
                ...state,
                error: { ...state.error, REMOVE_CONTACT: false },
            };
        case REMOVE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: state.contacts.filter(
                    (contact) => contact.webId !== payload.webId
                ),
            };
        case REMOVE_CONTACT_FAILURE:
            return {
                ...state,
                error: { ...state.error, REMOVE_CONTACT: payload },
            };
        case FETCH_CONTACTS:
            return {
                ...state,
                loadContacts: true,
                error: { ...state.error, FETCH_CONTACTS: false },
            };
        case FETCH_CURRENT_CONTACTS_SUCCESS:
            return {
                ...state,
                loadContacts: false,
                currentContacts: payload,
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
            return {
                ...state,
                currentContact: payload,
                currentContactRootUrl:
                    payload.storage ?? getRootFromWebId(payload.webId),
                currentContacts: null,
            };
        case SEARCH_CONTACT:
            return {
                ...state,
                searchingContacts: true,
                error: { ...state.error, SEARCH_CONTACT: false },
            };
        case FETCH_CONTACT:
            return {
                ...state,
                loadCurrentContact: true,
                error: { ...state.error, FETCH_CONTACT: false },
            };
        case FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                loadCurrentContact: false,
                error: { ...state.error, FETCH_CONTACT: false },
            };
        case SEARCH_CONTACT_SUCCESS:
            return {
                ...state,
                contactSearchResult: state.contactSearchResult
                    ? [...state.contactSearchResult, payload]
                    : [payload],
                error: { ...state.error, SEARCH_CONTACT: false },
            };
        case SEARCH_CONTACT_COMPLETED:
            return {
                ...state,
                searchingContacts: false,
                error: { ...state.error, SEARCH_CONTACT: false },
            };
        case SEARCH_CONTACT_FAILURE:
            return {
                ...state,
                searchingContacts: false,
                contactSearchResult: [],
                error: { ...state.error, SEARCH_CONTACT: !!payload },
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

export const isContact = (contacts, webId) => {
    if (contacts && webId) {
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].webId === webId) {
                return true;
            }
        }
    }
    return false;
};
