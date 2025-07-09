import {
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE
} from './GeminiActionTypes';

const initialState = {
  loading: false,
  generatedImageUrl: null,
  error: null
};

export const geminiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_IMAGE_REQUEST:
      return { ...state, loading: true, generatedImageUrl: null, error: null };
    case GENERATE_IMAGE_SUCCESS:
      return { ...state, loading: false, generatedImageUrl: action.payload };
    case GENERATE_IMAGE_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
