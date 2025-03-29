import {combineReducers, configureStore} from "@reduxjs/toolkit";

import UserSlice from "../reducer/UserSlice";
import SignUpSlice from "../reducer/SignUpSlice";


const rootReducer = combineReducers({

    users : UserSlice,
    signUp:SignUpSlice,
})



export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
// --------------------------------