import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import contactReducer from './contactReducer';

export default combineReducers({
    app: appReducer,
    user: userReducer,
    contact: contactReducer,
});
