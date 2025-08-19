import {
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE
} from './GeminiActionTypes';


export const generateImage = (prompt, imageUrl, seed = 13) => async (dispatch) => {
  if (!prompt.trim()) return;

  dispatch({ type: GENERATE_IMAGE_REQUEST });

  try {
    // const response = await fetch("https://monash-fit-deepfake-backend.vercel.app/api/gemini-edit-image", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ prompt, seed, imageUrl })
    // });
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { 
                  text: prompt 
                },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
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

    const data = await response.json();
    const imageData = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

    const generatedImageUrl = imageData ? `data:image/png;base64,${imageData}` : undefined;

    if (generatedImageUrl) {
      dispatch({ type: GENERATE_IMAGE_SUCCESS, payload: generatedImageUrl });
    } else {
      dispatch({ type: GENERATE_IMAGE_FAILURE, error: 'No image returned from Gemini' });
    }
  } catch (error) {
    dispatch({ type: GENERATE_IMAGE_FAILURE, error: error.message });
  }
};
