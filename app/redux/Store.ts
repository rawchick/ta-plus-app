import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import HomeScreenReducer from './reducers/HomeScreenReducer'

let rootReducer = combineReducers({
    HomeScreenState: HomeScreenReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;