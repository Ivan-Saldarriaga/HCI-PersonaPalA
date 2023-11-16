from api.auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64 

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

device = 'cuda'

# base model
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, revision="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)

# Ghibli
# model_id = "nitrosocke/Ghibli-Diffusion"
# pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)

# pipe = StableDiffusionXLPipeline.from_pretrained("segmind/SSD-1B", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")

pipe.to(device)


@app.get("/")
def generate(prompt): 
    with autocast(device): 
        negative_prompt = "low quality, bad quality, bad anatomy, low res"
        image = pipe(prompt=prompt, negative_prompt=negative_prompt, guidance_scale=8.5).images[0]


    # Converts it into the format of an image
    image.save("testimage.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    # Returns the image
    return Response(content=imgstr, media_type="image/png")

