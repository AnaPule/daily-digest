import os
from dotenv import load_dotenv ## environment variables

from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

load_dotenv()  # This loads the variables from '.env'

## the following function is crearted so this process can be automated 
def fetch_crypto_data():
    latest_url = os.getenv('CRYPTO_CURRENCY_LATEST_URL')
    history_url = os.getenv('CRYPTO_CURRENCY_HISTORY_URL')

    parameters = {
    'start':'1',
    'limit':'5000',
    'convert':'ZAR'
    }

    headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': os.getenv('CRYPTO_CURRENCY_API_KEY')
    }
    
    session = Session()
    session.headers.update(headers)

    try:
        response = session.get(latest_url, params=parameters)
        #history_res = session.get(history_url, params=parameters)

        data = json.loads(response.text)## retrieves data in json format
        #history_data = json.loads(history_res.text) #3retrieves data in json format
        
        if 'data' in data:
            cryptocurrency_data = data['data']
            print('latest crypto currency data retrieved successfully')
        else:
            print("API Error - Response:", data)
            cryptocurrency_data = []
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print("Network error:", e)
        cryptocurrency_data = []  
    except KeyError as e:
        print("Data structure error:", e)
        print("Received data:", data)
        cryptocurrency_data = []
    #print(f"Data type: {type(data)}") #reports data is a dictionary, not a list
    #cryptocurrency_data = data['data']
    ##print(f"Response of listings: {cryptocurrency_data}")
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
    ##empty the collection so that the new data has space
        ## db.cryptocurrency.delete_many({}) # This deletes ALL documents in the collection
        ## print("Cleared old crypto currency data")

    #3make inserts of new data
    batch_size = 100 ## inserts a hundred at a time -> prevents lagging or timeouts when inserting the data
    for i in range(0, len(formatted_data), batch_size):
        batch = formatted_data[i:i + batch_size]
        db.cryptocurrency.insert_many(batch) ## inserts many documents into the collection
        # print (f"inserted batch {i//batch_size + 1}")

    print ("All data listings  and prices updated successfully")
    #db.cryptocurrency.insert_many(cryptocurrency_data) ##inserts many documents into the collection
            
'''
latest_url = os.getenv('CRYPTO_CURRENCY_LATEST_URL')
history_url = os.getenv('CRYPTO_CURRENCY_HISTORY_URL')
parameters = {
  'start':'1',
  'limit':'5000',
  'convert':'ZAR'
}
headers = {
  'Accepts': 'application/json',
  'X-CMC_PRO_API_KEY': os.getenv('CRYPTO_CURRENCY_API_KEY')
}

session = Session()
session.headers.update(headers)

try:
  response = session.get(latest_url, params=parameters)
  history_res = session.get(history_url, params=parameters)

  data = json.loads(response.text)## retrieves data in json format
  #history_data = json.loads(history_res.text) #3retrieves data in json format

  print('latest data retrieved successfully')
except (ConnectionError, Timeout, TooManyRedirects) as e:
  print(e)

## displaying data in a more normalised format - for testing using jupyter
#import pandas as pd
#pd.set_potion('display.max_columns', None)
#pd.json_normalize(data['data'])

#print(f"{history_data}")
#pd.json_normalize(history_data['data'])

#print(f"Data type: {type(data)}") #reports data is a dictionary, not a list
cryptocurrency_data = data['data']
history = data['data']
##print(f"History of listings: {history}")
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

##empty the collection so that the new data has space
db.cryptocurrency.delete_many({}) # This deletes ALL documents in the collection
print("Cleared existing data")

#3make inserts of new data
batch_size = 100 ## inserts a hundred at a time -> prevents lagging or timeouts when inserting the data
for i in range(0, len(formatted_data), batch_size):
    batch = formatted_data[i:i + batch_size]
    db.cryptocurrency.insert_many(batch) ## inserts many documents into the collection
    # print (f"inserted batch {i//batch_size + 1}")

print ("All data listings inserted successfully")
#db.cryptocurrency.insert_many(cryptocurrency_data) ##inserts many documents into the collection
'''