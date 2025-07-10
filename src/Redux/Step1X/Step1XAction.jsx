import { STEP1X_BASE_URL } from "../../config/ApiConfig.jsx";
import { RUN_STEP1X_FAILURE, RUN_STEP1X_REQUEST, RUN_STEP1X_SUCCESS } from "./Step1XActionType";
import { Client } from "@gradio/client";

export const runStep1X = (image, edit_instructions) => async (dispatch) => {
  try {
    dispatch({type: RUN_STEP1X_REQUEST}); 
                            
    const client = await Client.connect(STEP1X_BASE_URL);
    const result = await client.predict("/partial", { 
        prompt: edit_instructions, 		
        ref_images: image, 
        seed: 3,
        size_level: 512
    });

    console.log(result.data);

    dispatch({
      type: RUN_STEP1X_SUCCESS,
      payload: result.data[0].url
    });
  } catch (error) {
    dispatch({ 
        type: RUN_STEP1X_FAILURE, 
        payload: 
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message, 
    });
  }
}