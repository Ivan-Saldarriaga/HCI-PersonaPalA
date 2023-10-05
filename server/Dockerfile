# Choose our version of Python
FROM python:3.11.5

# Set up the working directory
WORKDIR /code

# Copy jus the requirements into the working directory so it gets cached by itself
COPY ./requirements.txt /code/requirements.txt

# Installing the dependencies from the requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the API code into the working directory
COPY ./api /code/api

# Tell uvicorn to start spin up our code, which will be running inside the container
CMD ["uvicorn", "api.api:app", "--host", "0.0.0.0", "--port", "80"]