import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { thunk } from "redux-thunk"
import { geminiReducer } from "./Gemini/GeminiReducer"
import { fakeShieldReducer } from "./FakeShield/FakeShieldReducer"
import { qwenReducer } from "./Qwen/QwenReducer"
import { step1XReducer } from "./Step1X/Step1XReducer"

const rootReducers = combineReducers({
    geminiData: geminiReducer,
    fakeShieldData: fakeShieldReducer,
    qwenData: qwenReducer,
    step1XData: step1XReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))