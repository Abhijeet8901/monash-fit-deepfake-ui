import {
  FAKESHIELD_DTE_BASE_URL,
  FAKESHIELD_MFLM_BASE_URL
} from "../../config/ApiConfig.jsx";
import {
  RUN_FAKESHIELD_DTE_FAILURE,
  RUN_FAKESHIELD_DTE_REQUEST,
  RUN_FAKESHIELD_DTE_SUCCESS,
  RUN_FAKESHIELD_MFLM_FAILURE,
  RUN_FAKESHIELD_MFLM_REQUEST,
  RUN_FAKESHIELD_MFLM_SUCCESS
} from "./FakeShieldActionType";
import { Client } from "@gradio/client";

export const runFakeShieldDTE = (image) => async (dispatch) => {
  try {
    dispatch({ type: RUN_FAKESHIELD_DTE_REQUEST });

    const client = await Client.connect(FAKESHIELD_DTE_BASE_URL);
    const result = await client.predict("/detect", {
      pil_img: image
    });

    console.log(result.data);
    dispatch({
      type: RUN_FAKESHIELD_DTE_SUCCESS,
      payload: result.data[0]
    });
  } catch (error) {
    dispatch({
      type: RUN_FAKESHIELD_DTE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const runFakeShieldMFLM = (image, explanation) => async (dispatch) => {
  try {
    dispatch({ type: RUN_FAKESHIELD_MFLM_REQUEST });

    const client = await Client.connect(FAKESHIELD_MFLM_BASE_URL);
    const result = await client.predict("/mask", {
      pil_img: image,
      explanation: explanation
    });

    console.log(result.data);
    dispatch({
      type: RUN_FAKESHIELD_MFLM_SUCCESS,
      payload: {
        label: result.data[0].label,
        mask: result.data[1].url
      }
    });
  } catch (error) {
    dispatch({
      type: RUN_FAKESHIELD_MFLM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
