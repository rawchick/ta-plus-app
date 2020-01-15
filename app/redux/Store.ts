//import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import CreateReducer from "./CreateReducer";
import { reducer as formreducer } from "redux-form" // ที่ต้องใส as formreducer เพราะบาง module มีชื่อโหล
import mNote from "../models/mNote";
import mLoginScreen from "../models/mLoginScreenState";
import mHomeScreen from "../models/mHomeScreenState";
import mSearchScreen from "../models/mSearchScreen";
import mAuthState from "../models/mAuthState";
import mPinCodeScreenState from '../models/mPinCodeScreenState'
import mNewTripScreenState from '../models/mNewTripScreenState'
import mSplashScreenState from '../models/mSplashScreenState'
import thunk from "redux-thunk";

export default function configureStore() {
    let rootReducer = combineReducers({
        AuthState: new CreateReducer(mAuthState).reducer,
        SplashScreenState: new CreateReducer(mSplashScreenState).reducer,
        PinCodeScreenState: new CreateReducer(mPinCodeScreenState).reducer,
        HomeScreenState: new CreateReducer(mHomeScreen).reducer,
        LoginScreenState: new CreateReducer(mLoginScreen).reducer,
        SearchScreenState: new CreateReducer(mSearchScreen).reducer,
        SettingScreenState: new CreateReducer({}).reducer,
        NewTripScreenState: new CreateReducer(mNewTripScreenState).reducer
    })

    const store = createStore(rootReducer, applyMiddleware(thunk)
        //NoteReducer // กรณีมี reducer เดียว
    );
    return store
}
// note : projectReducer(new mNote()),