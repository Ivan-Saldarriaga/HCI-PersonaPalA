from controlnet_aux import OpenposeDetector
from diffusers.utils import load_image
from PIL import Image

openpose = OpenposeDetector.from_pretrained("lllyasviel/ControlNet")

openpose_image = Image.open("C:/Users/tamhu/Downloads/shoulderup.png")

openpose_image = openpose(openpose_image).resize((512, 512))

openpose_image.save("openpose.png")