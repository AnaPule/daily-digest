"""

## fetching data from a public api
        ## step 1: python3 -m pip install requests -> installs the req package to pull needed data
        ## step 2: import requests
import requests
import json
        ## step 3: public api and api key
api_key = '0b95ce3f8fae4999aa887b40c2c25aec' ## personal api key
api_url = 'https://newsapi.org/v2/everything?1=tesla&from=2025=08-17&sortBy=publishedAt&apiKey=095ce3f8fae4999aa887b40c2c25aec' ## api url
        ##step 4: make a get request from the api endpoint
res = requests.get(api_url).json()
print(res)
        ## step 5: check req success using status
if res.status_code == 200:
    print("status 200")
else:
    print(f"Request failed with status code: {res.status_code}")
"""
from pymongo import MongoClient
from newsapi import NewsApiClient
from datetime import date, timedelta
import os
from dotenv import load_dotenv  ## environment variables

load_dotenv()

newsapi = NewsApiClient(api_key=os.getenv('NEWS_ARTICLES_API_KEY'))
start_of_week = date.today() - timedelta(days=date.today().weekday())
end_of_week = date.today() + timedelta(days=date.today().weekday())
"""
# print (f"start of the week: {start_of_week}")
# print (f"end of the week: {end_of_week}")
"""
from newsdataapi import NewsDataApiClient

api = NewsDataApiClient (apikey=os.getenv('NEWS_API_KEY'))
    # response = api.news_api(q="general", country="za")
# Use the latest API method as suggested in the warning
try:
    # Try the new method name
    response = api.latest_api(q="general", country="za")
except AttributeError:
    # Fallback to the old method if latest_api doesn't exist
    response = api.news_api(q="general", country="za")
print("general articles successfully retrieved")
#print(f"{response}")


client = MongoClient(os.getenv('DATABASE_URL'))
db = client[os.getenv('DATABASE')]
#db.create_collection('headlines')
## format: database.collection.function
db.general.insert_many(response['results'])
print("general articles successfully saved")