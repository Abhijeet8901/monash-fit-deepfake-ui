import { STEP1X_BASE_URL } from "../../config/ApiConfig";
import { RUN_QWEN_FAILURE, RUN_QWEN_REQUEST, RUN_QWEN_SUCCESS } from "./QwenActionType";
import { Client } from "@gradio/client";

export const runQwen = (image, complex_explanation) => async (dispatch) => {
  try {
    dispatch({type: RUN_QWEN_REQUEST});
                            
    const client = await Client.connect(STEP1X_BASE_URL);
    const result = await client.predict("/simplify", { 
				img: image, 		
        complex_explanation: complex_explanation, 
    });

    console.log(result.data);

    dispatch({
      type: RUN_QWEN_SUCCESS,
      payload: result.data[0]
    });
  } catch (error) {
    dispatch({ 
        type: RUN_QWEN_FAILURE, 
        payload: 
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message, 
    });
  }
}