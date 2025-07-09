import {
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE
} from "./GeminiActionTypes";

const apiKey = process.env.GEMINI_API_KEY;

export const generateImage =
  (prompt, imageUrl, seed = 42) =>
  async (dispatch) => {
    if (!prompt.trim()) return;

    dispatch({ type: GENERATE_IMAGE_REQUEST });

    if (!apiKey) {
      dispatch({ type: GENERATE_IMAGE_FAILURE, error: "API key is not set" });
      return;
    }

    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  },
                  {
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: imageUrl
                    }
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.8,
              candidateCount: 1,
              seed: seed,
              responseModalities: ["TEXT", "IMAGE"]
            }
          })
        }
      );
      const result = await geminiRes.json();
      const imageData = result?.candidates?.[0]?.content?.parts?.find(
        (p) => p.inlineData
      )?.inlineData?.data;

      const generatedImageUrl = `data:image/jpeg;base64,${imageData}`;

      if (imageData) {
        dispatch({
          type: GENERATE_IMAGE_SUCCESS,
          payload: generatedImageUrl
        });
      } else {
        dispatch({
          type: GENERATE_IMAGE_FAILURE,
          error: "No image returned from Gemini"
        });
      }
    } catch (error) {
      console.log(error.messg);
      dispatch({ type: GENERATE_IMAGE_FAILURE, error: error.message });
    }
  };
