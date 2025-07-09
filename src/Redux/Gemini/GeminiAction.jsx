import {
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE
} from './GeminiActionTypes';


export const generateImage = (prompt, imageUrl, seed = 42) => async (dispatch) => {
  if (!prompt.trim()) return;

  dispatch({ type: GENERATE_IMAGE_REQUEST });

  try {
    const response = await fetch("https://monash-fit-deepfake-backend.vercel.app/api/gemini-edit-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, seed, imageUrl })
    });

    const data = await response.json();

    if (data.generatedImageUrl) {
      dispatch({ type: GENERATE_IMAGE_SUCCESS, payload: data.generatedImageUrl });
    } else {
      dispatch({ type: GENERATE_IMAGE_FAILURE, error: 'No image returned from Gemini' });
    }
  } catch (error) {
    dispatch({ type: GENERATE_IMAGE_FAILURE, error: error.message });
  }
};
