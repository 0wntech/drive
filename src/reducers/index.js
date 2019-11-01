import { combineReducers } from 'redux';
import appReducer from './AppReducer';
import userReducer from './UserReducer';
export default combineReducers({
    app: appReducer,
    user: userReducer,
});
