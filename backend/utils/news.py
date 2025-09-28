import os
import json
import http.client, urllib.parse
from datetime import date, timedelta
from dotenv import load_dotenv ## environment variables

load_dotenv()  # This loads the variables from '.env'

conn = http.client.HTTPConnection('api.mediastack.com')
start_of_week = date.today() - timedelta(days=date.today().weekday())
end_of_week = date.today() + timedelta(days=date.today().weekday())

params = urllib.parse.urlencode({
    'access_key': os.getenv('NEWS_API_KEY'),
    'languages' : 'en',
    'sort': 'published_desc',
    })

def fetch_headlines():
    try:
        conn.request('GET', '/v1/news?{}'.format(params))

        res = conn.getresponse()
        data = res.read()
        

        # Parse the JSON response
        json_data = data.decode('utf-8')
        parsed_data = json.loads(json_data)

        ## print('Response status:', res.status)
        ## print('Raw response:', json_data)
        ## print(f"Data type: {type(parsed_data)}")
        ## print(f"Response keys: {parsed_data.keys()}")
    
        # Extract the actual news articles from the 'data' key
        news_articles = parsed_data.get('data', [])
        ## print(f"Number of articles: {len(news_articles)}")
        ## print(f"First article: {news_articles[0] if news_articles else 'No articles'}")
            
        # Connect to MongoDB and insert the articles
        from pymongo import MongoClient
        client = MongoClient(os.getenv('DATABASE_URL'))
        db = client[os.getenv('DATABASE')]

        if news_articles:
            result = db.news.insert_many(news_articles)
            print(f"Inserted {len(result.inserted_ids)} articles into MongoDB")
        else:
            print("No articles to insert")
            
        client.close()
    except AttributeError:
       print("error fetching latest articles: ", AttributeError)
