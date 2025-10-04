'''

from pymongo import MongoClient
import os
import certifi 
from dotenv import load_dotenv

load_dotenv()

def getdatabase():
    client = MongoClient(os.getenv('MONGODB_URI'))
    # Test the connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
    return client[os.getenv('DATABASE')]
getdatabase()

'''

import os
from pymongo import MongoClient
import certifi  # Add this import
from dotenv import load_dotenv

load_dotenv()

def getdatabase():
    # Get MongoDB URI from environment variables
    MONGODB_URI = os.getenv('MONGODB_URI')
    
    if not MONGODB_URI:
        raise ValueError("MONGODB_URI environment variable is not set")
    
    # Connect to MongoDB with SSL certificate handling
    try:
        client = MongoClient(
            MONGODB_URI,
            tls=True,
            tlsCAFile=certifi.where(),  # This fixes the SSL certificate issue
            serverSelectionTimeoutMS=5000
        )
        
        # Test the connection
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        # Get the database name from environment or use default
        database_name = os.getenv('DATABASE', 'daily-digest-db')
        db = client[database_name]
        
        print(f"Database connection: {database_name} is connected to MongoDB!")
        return db
        
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        raise
getdatabase()