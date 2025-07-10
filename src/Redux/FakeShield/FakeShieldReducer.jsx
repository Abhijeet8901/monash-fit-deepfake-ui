import { 
    RUN_FAKESHIELD_DTE_FAILURE, 
    RUN_FAKESHIELD_DTE_REQUEST, 
    RUN_FAKESHIELD_DTE_SUCCESS,
    RUN_FAKESHIELD_MFLM_FAILURE, 
    RUN_FAKESHIELD_MFLM_REQUEST, 
    RUN_FAKESHIELD_MFLM_SUCCESS  
} from "./FakeShieldActionType"

const initialState = {
    label: null,
    complex_explanation: null,
    mask: null,
    loading: false,
    error: null
}

export const fakeShieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case RUN_FAKESHIELD_DTE_REQUEST:
            return { ...state, loading: true }
        case RUN_FAKESHIELD_DTE_SUCCESS:
            return { ...state, loading: false, complex_explanation: action.payload }
        case RUN_FAKESHIELD_DTE_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case RUN_FAKESHIELD_MFLM_REQUEST:
            return { ...state, loading: true }
        case RUN_FAKESHIELD_MFLM_SUCCESS:
            return { ...state, loading: false, label: action.payload.label, mask: action.payload.mask }
        case RUN_FAKESHIELD_MFLM_FAILURE:
            return { ...state, loading: false, error: action.payload }               
        default:
            return state;
    }
}