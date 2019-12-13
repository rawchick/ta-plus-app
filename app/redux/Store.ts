//import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import CreateReducer from "./CreateReducer";
import { reducer as formreducer } from "redux-form" // ที่ต้องใส as formreducer เพราะบาง module มีชื่อโหล
import mNote from "../models/mNote";
import thunk from "redux-thunk";

export default function configureStore() {
    let rootReducer = combineReducers({
        note: new CreateReducer(mNote).reducer,
        //home: newHomeReducer.reducer,
        form: formreducer
    })

    const store = createStore(rootReducer, applyMiddleware(thunk)
        //NoteReducer // กรณีมี reducer เดียว
    );
    return store
}
// note : projectReducer(new mNote()),