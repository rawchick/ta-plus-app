//import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import CreateReducer from "./CreateReducer";
import { reducer as formreducer } from "redux-form" // ที่ต้องใส as formreducer เพราะบาง module มีชื่อโหล
import mNote from "../models/mNote";
import mLoginScreen from "../models/mLoginScreen";
import mHomeScreen from "../models/mHomeScreen";
import mSearchScreen from "../models/mSearchScreen";
import mAuthState from "../models/mAuth";
import mPinCode from '../models/mPinCode'
import mNewTripScreen from '../models/mNewTripScreen'
import thunk from "redux-thunk";

export default function configureStore() {
    let rootReducer = combineReducers({
        AuthState: new CreateReducer(mAuthState).reducer,
        PinCodeScreenState: new CreateReducer(mPinCode).reducer,
        HomeScreenState: new CreateReducer(mHomeScreen).reducer,
        LoginScreenState: new CreateReducer(mLoginScreen).reducer,
        SearchScreenState: new CreateReducer(mSearchScreen).reducer,
        SettingScreenState: new CreateReducer({}).reducer,
        NewTripScreenState: new CreateReducer(mNewTripScreen).reducer,
    })

    const store = createStore(rootReducer, applyMiddleware(thunk)
        //NoteReducer // กรณีมี reducer เดียว
    );
    return store
}
// note : projectReducer(new mNote()),