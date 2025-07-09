import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { thunk } from "redux-thunk"
import { geminiReducer } from "./Gemini/GeminiReducer"

const rootReducers = combineReducers({
    geminiData: geminiReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))