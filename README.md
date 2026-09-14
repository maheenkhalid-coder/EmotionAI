# 🧠❤️ EmotionAI — NLP Emotion Prediction

> An end-to-end **Natural Language Processing (NLP)** application that predicts the emotion expressed in a given text using **Bag-of-Words** and **Logistic Regression**.

## 🚀 Live Demo

👉 **[Try EmotionAI](https://emotionai-1-6tca.onrender.com)**

## 📌 About

**EmotionAI** is a **Text Classification** project that analyzes written text and predicts the emotion expressed in the sentence.

The project uses **Bag-of-Words (BoW)** for text feature extraction and **Logistic Regression** for emotion classification.

The trained model is integrated into a **FastAPI backend** and connected to an interactive web frontend for real-time emotion prediction.

## 🔄 Machine Learning Workflow

```text
Data Understanding
      ↓
EDA & Data Cleaning
      ↓
Text Preprocessing
      ↓
Bag-of-Words
      ↓
Label Encoding
      ↓
Model Training
      ↓
Model Evaluation
      ↓
FastAPI Backend
      ↓
Interactive Web Frontend
```

## 🤖 Model

Several classification models were evaluated:

* Logistic Regression
* Naive Bayes

### 🏆 Final Model: Logistic Regression

The final Logistic Regression model was selected based on its overall classification performance.

### 📊 Evaluation Metrics

The model was evaluated using:

| Metric           | Evaluation                          |
| ---------------- | ----------------------------------- |
| Accuracy         | Model accuracy                      |
| Precision        | Class-level precision               |
| Recall           | Class-level recall                  |
| F1-Score         | Balanced classification performance |
| Confusion Matrix | Class prediction analysis           |

## 🛠️ Technologies

* **Python**
* **Pandas & NumPy**
* **Scikit-learn**
* **Bag-of-Words (BoW)**
* **Logistic Regression**
* **Naive Bayes**
* **FastAPI & Uvicorn**
* **Pydantic**
* **Joblib**
* **HTML, CSS & JavaScript**
* **Git & GitHub**
* **Render**

## ✨ Features

* 🧠 NLP-based emotion classification
* ✍️ Text-based emotion prediction
* ⚡ Real-time predictions
* 📊 Bag-of-Words text representation
* 🤖 Logistic Regression classification
* 🔌 FastAPI REST API
* ✅ Pydantic input validation
* 🌐 Interactive web interface
* 📱 Responsive frontend
* 🚀 Online deployment with Render

## 📁 Project Structure

```text
EmotionAI/
│
├── README.md
├── sentiments_data.txt
├── EmotionAI.ipynb
├── emotion_bow_vectorizer.pkl
├── emotion_label_encoder.pkl
├── emotion_logistic_regression.pkl
├── requirements.txt
│
├── backend/
│   └── main.py
│
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

## 🎯 Project Goal

The goal of **EmotionAI** is to demonstrate how a traditional NLP machine learning model can be developed into a complete end-to-end AI application.

The project connects:

```text
Machine Learning
      +
NLP
      +
FastAPI
      +
Frontend
      +
Deployment
```

to create a real-time emotion prediction application.

## ⚠️ Disclaimer

EmotionAI is an **educational Machine Learning project** designed to demonstrate NLP-based emotion classification. The predictions should not be considered a definitive interpretation of a person's emotions or mental state.
