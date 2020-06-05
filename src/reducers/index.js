import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import contactReducer from './contactReducer';
import userAppReducer from './userAppReducer';

export default combineReducers({
    userApps: userAppReducer,
    app: appReducer,
    user: userReducer,
    contact: contactReducer,
});
