import os
from dotenv import load_dotenv ## environment variables

from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

load_dotenv()  # This loads the variables from '.env'

url = os.getenv('CRYPTO_CURRENCY_URL')
parameters = {
  'start':'1',
  'limit':'5000',
  'convert':'USD'
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': os.getenv('CRYPTO_CURRENCY_API_KEY')
}

session = Session()
session.headers.update(headers)

try:
  response = session.get(url, params=parameters)
  data = json.loads(response.text)## retrieves data in json format
  print('data retrieved successfully')
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)

## displaying data in a more normalised format
import pandas as pd
#pd.set_potion('display.max_columns', None)
pd.json_normalize(data['data'])


# Your code to fetch data here...

#print(f"Data type: {type(data)}") #reports data is a dictionary, not a list
cryptocurrency_data = data['data']
#print (f"formatted: {cryptocurrency_data[:1]}")
#print(f"Data length: {len(cryptocurrency_data) if isinstance(cryptocurrency_data, list) else 'Not a list'}")


## error -> OverflowError: MongoDB can only handle up to 8-byte ints
    #fix large number issue -> helper function
def fix_large_numbers(doc): ## define the function and takes one parameter 'doc'
    """Recursively convert large integers to floats in a document"""
    if isinstance(doc, dict): ## handles dictionaries, and if doc is of that type, loop through its items
        for key, value in doc.items():
            if isinstance(value, int) and abs(value) > 2**63 - 1: ##if the doc item is an int and is greater than the max 64-bit integer (2^63 - 1)
                doc[key] = float(value) ## then convert the item into a float value
            elif isinstance(value, (dict, list)): ##recursuve handling of nested structures: If the value is not a large int, but is either a dictionary or list
                fix_large_numbers(value) ## Calls the same function recursively to process the nested structure
    elif isinstance(doc, list): ## extension of the 1st if, if the doc variable is a list type
        for item in doc: ## loop through each item in the list
            fix_large_numbers(item) ## call the same function recursively to process each item
    return doc ## returning the finally converted data in that doc.

# Apply the fix to all documents
formatted_data = [fix_large_numbers(doc) for doc in cryptocurrency_data]

    # we convert it to a list, because the .insert_may function accepts only lists
##conection backend to a mongo database
    ## install the library that allows that connection -> python3 -m pip install pymongo
from pymongo import MongoClient
    ## create a mongodb instance to connect to your db
client = MongoClient(os.getenv('DATABASE_URL'))
db = client[os.getenv('DATABASE')] ##accessing the database from the backend
#db.create_collection('cryptocurrency') ##creating a collection from the backend
        ## note: to insert a single document into the collection -> db.cryptocurrency.insert_one(data)

batch_size = 100 ## inserts a hundred at a time -> prevents lagging or timeouts when inserting the data
for i in range(0, len(formatted_data), batch_size):
    batch = formatted_data[i:i + batch_size]
    db.cryptocurrency.insert_many(batch) ## inserts many documents into the collection
    # print (f"inserted batch {i//batch_size + 1}")

print ("All data inserted successfully")
#db.cryptocurrency.insert_many(cryptocurrency_data) ##inserts many documents into the collection
