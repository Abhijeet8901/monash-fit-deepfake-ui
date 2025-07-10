import { 
    RUN_STEP1X_FAILURE, 
    RUN_STEP1X_REQUEST, 
    RUN_STEP1X_SUCCESS 
} from "./Step1XActionType"

const initialState = {
    generated_image: null,
    loading: false,
    error: null
}

export const step1XReducer = (state = initialState, action) => {
    switch (action.type) {
        case RUN_STEP1X_REQUEST:
            return { ...state, loading: true }
        case RUN_STEP1X_SUCCESS:
            return { ...state, loading: false, generated_image: action.payload}
        case RUN_STEP1X_FAILURE:
            return { ...state, loading: false, error: action.payload.error}
        default:
            return state;
    }
}