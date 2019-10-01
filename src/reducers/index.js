import { combineReducers } from 'redux';
import appReducer from './AppReducer';
export default combineReducers({
    app: appReducer,
});
