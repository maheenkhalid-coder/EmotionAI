# import joblib to load the trained machine learning files
import joblib

# import pandas to create the input DataFrame
import pandas as pd

# import FastAPI to create the API
from fastapi import FastAPI

# import Pydantic for input validation
from pydantic import BaseModel, Field

# import CORS middleware to allow requests from different origins
from fastapi.middleware.cors import CORSMiddleware


# ---------------------------------------------------------
# load the trained machine learning files
# ---------------------------------------------------------

# load the trained Logistic Regression model
model = joblib.load('emotion_logistic_regression.pkl')

# load the Bag of Words vectorizer
vectorizer = joblib.load('emotion_bow_vectorizer.pkl')

# load the Label Encoder used during training
label_encoder = joblib.load('emotion_label_encoder.pkl')


# ---------------------------------------------------------
# create the FastAPI application
# ---------------------------------------------------------

app = FastAPI()


# ---------------------------------------------------------
# enable CORS
# ---------------------------------------------------------

# allow the API to receive requests from different
# frontend applications
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # allow requests from any origin
    allow_methods=["*"],     # allow all HTTP methods
    allow_headers=["*"],     # allow all HTTP headers
)


# ---------------------------------------------------------
# define the input data structure
# ---------------------------------------------------------

class EmotionData(BaseModel):

    # text entered by the user
    # min_length prevents empty input
    text: str = Field(..., min_length=1)


# ---------------------------------------------------------
# define the prediction response
# ---------------------------------------------------------

class PredictionResponse(BaseModel):

    # predicted emotion returned by the model
    predicted_emotion: str


# ---------------------------------------------------------
# create prediction endpoint
# ---------------------------------------------------------

@app.post('/predict', response_model=PredictionResponse)
def predict(data: EmotionData):

    # create a DataFrame using the same text structure
    # used during model training
    input_data = pd.DataFrame([{
        'text': data.text
    }])

    # convert the input text into Bag of Words features
    # using the vectorizer fitted during training
    text_vectorized = vectorizer.transform(input_data['text'])

    # make prediction using the trained Logistic Regression model
    # the model returns the encoded emotion number
    prediction_encoded = model.predict(text_vectorized)[0]

    # convert the encoded number back to the original
    # emotion name using the saved Label Encoder
    predicted_emotion = label_encoder.inverse_transform(
        [prediction_encoded]
    )[0]

    # return the predicted emotion
    return PredictionResponse(
        predicted_emotion=str(predicted_emotion)
    )


# ---------------------------------------------------------
# health check endpoint
# ---------------------------------------------------------

@app.get('/')
def home():

    # simple message to check whether the API is running
    return {
        'message': 'Emotion Prediction API is running'
    }


# ---------------------------------------------------------
# short note
# ---------------------------------------------------------

# In main.py we create a FastAPI backend for our
# trained Emotion Classification model.
#
# Load:
# 1. Logistic Regression model
# 2. Bag of Words vectorizer
# 3. Label Encoder
#
# Validate user input using Pydantic.
#
# Convert the user's text into Bag of Words features.
#
# Send the transformed text to the trained
# Logistic Regression model.
#
# Convert the predicted encoded number back into
# the original emotion name using Label Encoder.
#
# Return the predicted emotion through the /predict API.
#
# Simple flow:
#
# User Text
#     ↓
# Pydantic Validation
#     ↓
# BOW Vectorizer
#     ↓
# Logistic Regression
#     ↓
# Label Encoder
#     ↓
# Predicted Emotion
#     ↓
# API Response