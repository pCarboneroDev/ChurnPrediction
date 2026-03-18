# Churn Prediction API & Frontend

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge\&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-FF6600?style=for-the-badge\&logo=xgboost\&logoColor=white)

A complete customer churn prediction system with a FastAPI backend and React TypeScript frontend using shadcn/ui components. The model achieves **90% recall** in detecting customers at risk of churn.

## Table of contents
- [Features](#features)
- [Model Perforrmance](#model-performance)
- [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Usage](#usage)
- [Technologies used](#technologies-used)

## Features

* **High Recall Model**: 90% recall for churn detection (identifies 9 out of 10 customers who will churn)
* **Interactive Web Interface**: Built with React, TypeScript, and shadcn/ui
* **RESTful API**: FastAPI backend with automatic documentation
* **Real-time Predictions**: Get instant churn risk assessments
* **Business Recommendations**: Actionable insights for customer retention
* **Comprehensive Data Validation**: Type-safe with Pydantic and TypeScript

---

## Model Performance

The model is optimized for **high recall** to minimize false negatives (missing customers who will churn):

| Metric         | Value |
| -------------- | ----- |
| Recall (Churn) | 90%   |
| Precision      | 45%   |
| F1-Score       | 0.60  |
| Accuracy       | 68.5% |

**Business Context:**
In churn prediction, false negatives (missing a customer who will leave) are **5–10x more costly** than false positives. A 90% recall means we identify **9 out of 10 customers at risk**.

## Installation
### Backend
1. Create virtual environment
``` 
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
2. Install dependencies
```
pip install -r requirements.txt
```
3. Start FastApi server
```
uvicorn api.main:app --reload
```

### Frontend
1. Navigate to the React project directory
```
cd frontend/churn-prediction
```
2. Install dependencies
```
npm install
```
3. Run app
```
npm run dev
```

## Usage
1. Open the frontend application.

2. Fill in the customer data across 5 tabs:
    - Demographics: Gender, Senior Citizen, Partner, Dependents, Tenure
    - Phone Services: Phone Service, Multiple Lines
    - Internet Services: Internet Service, Streaming TV, Streaming Movies
    - Security: Online Security, Online Backup, Device Protection, Tech Support
    - Billing: Contract, Paperless Billing, Payment Method, Charges

3. Click "Predict Churn" to get the result

4. View the prediction, probability, and business recommendation

## Technologies Used
### Backend
* FastAPI: Modern web framework for APIs

* XGBoost: Gradient boosting library

* scikit-learn: Machine learning utilities

* imbalanced-learn: SMOTE for handling imbalanced data

* Pydantic: Data validation

### Frontend
* React: UI library

* TypeScript: Type safety

* shadcn/ui: Beautiful, accessible components

* TailwindCSS: Styling

* Vite: Build tool