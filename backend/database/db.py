from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def getdatabase():
    client = MongoClient(os.getenv('DATABASE_URL'))
    # Test the connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
    finally:
         print(f"Database connection: {os.getenv('DATABASE')} is connected to MongoDB!")
    return client[os.getenv('DATABASE')]
getdatabase()