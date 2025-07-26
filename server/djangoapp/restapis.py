# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()

backend_url = os.getenv("backend_url", default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    "sentiment_analyzer_url", default="http://localhost:5050/"
)

# def get_request(endpoint, **kwargs):


def get_request(endpoint, **kwargs):
    try:
        # Construir URL con parámetros seguros
        params = urlencode(kwargs)
        request_url = f"{backend_url}{endpoint}"
        if params:
            request_url += f"?{params}"

        print("GET from:", request_url)

        response = requests.get(request_url)

        # Comprobar si la respuesta fue exitosa
        response.raise_for_status()

        return response.json()
    except requests.exceptions.RequestException as e:
        print("Network exception occurred:", e)
        return {"error": str(e)}


# def analyze_review_sentiments(text):
def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "analyze/" + text
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


# request_url = sentiment_analyzer_url+"analyze/"+text
# Add code for retrieving sentiments


# def post_review(data_dict):
# Add code for posting review
def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Network exception occurred")
