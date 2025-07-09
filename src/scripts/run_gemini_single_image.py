from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

API_KEY = "<API_KEY>"
IMAGE_PATH = "../../../Downloads/images/spidey.jpg"
# PROMPT = "Edit the image to remove the pink flower from the man's lapel and replace the bicycle with a black motorcycle. The man will be depicted riding the motorcycle, maintaining his current posture and clothing. The woman holding the umbrella is now sitting behind the man on the motorcycle as a pillion rider. The background scene with the buildings, street signs ('PARKS ROAD' and '- STREET'), and the overall lighting will remain the same."
# PROMPT = "Edit the image to remove the pink flower from the man's lapel and instead add a basket with a bouquet of roses on the bicycle handle. The man's posture and clothing, the woman carrying the umbrella, the background scene with the buildings, street signs ('PARKS ROAD' and '- STREET'), and the overall lighting will remain the same."
PROMPT = "In this image, edit {target}. {instruction}. Do not change anything else in the image."
OUTPUT_SAVE_PATH = "../../../Downloads/images/spidey_{iter}.jpg"

TGT = "the left person"
INST = "add a wanted poster in his hand showing the left person's face"
ITR = "16"


# "Show them as wearing Ironman's helmet, holding Captain America's shield and holding Thor's hammer,  respectively from left to right"

client = genai.Client(api_key=API_KEY)
img = Image.open(IMAGE_PATH)
response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[PROMPT.format(target=TGT, instruction=INST), img],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE']
            )
        )

if response.candidates is not None and response.candidates[0].content is not None:
    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print(part.text)
        if part.inline_data is not None:
            image = Image.open(BytesIO(part.inline_data.data))
            image.save(OUTPUT_SAVE_PATH.format(iter=ITR))
    
print(response.usage_metadata)