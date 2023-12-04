# HCI-PersonaPalA
Human-Computer Interaction (Design A)

Team: Ivan Saldarriaga, Wavid Bowman, Tam Huynh, Yunxiao Chen (Charis)
## Front-End
Technologies, frameworks, and libraries: ReactJS
## Back-End
Technologies, frameworks, and libraries: Anaconda, Python, Uvicorn, Hugging Face Diffusers, PyTorch, Stable Diffusion, FastAPI, Docker (Optional), Firebase Datastore, Google OAuth.
## Idea & Approach
Prompt: A character customization interface in a game that helps players
customize the personality/attitude of their chosen character.

# Setup
To run the codebase, it is required that the computer you are running this application is compatible with CUDA.

## Front-End
Install [NodeJS](https://nodejs.org/en/download) 

Run the following from the source directory
```
cd ./persona-pal
npm i -y
npm start
```

Under ./persona-pal/src/firebase/config.js
fill in the following information with your own firebase config:
```
const config = {
apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: "",
measurementId: ""
};
```
Creating a [firebase webapp](https://firebase.google.com/) instance should automatically create the required config.

## Back-End
Install [Anaconda](https://www.anaconda.com/download) along with the anaconda cmd prompt.

Create a [Hugging Face](https://huggingface.co/) account and [create a user token](https://huggingface.co/docs/hub/security-tokens).

Run the following commands with an anaconda command prompt.
```
cd ./server
conda create --name {myEnvName} --file requirements.txt
conda activate {myEnvName}
uvicorn api.api:app --host 127.0.0.1 --port 8000
```

If there are issues with the conda environment installation, here are the base libraries that are required:
```
pip install diffusers
pip install accelerate
pip install fastapi
pip install uvicorn
```
Additionally, please refer to the [PyTorch](https://pytorch.org/get-started/locally/) installation page to find the version that best fits your system.

Under ./server/api/auth_token.py set
```
auth_token = "your_auth_token_here"
```
