"""implement socket method later..."""
import os
import atexit
from flask import Flask, jsonify
from dotenv import load_dotenv  ## environment variables
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS  # For handling Cross-Origin Resource Sharing

## routes
    ##from backend.routes.article import article_bp
    ##from backend.routes.crypto import crypto_bp
from backend.routes import article_bp, crypto_bp, news_bp

## utils
from backend.utils import fetch_crypto_data, fetch_general_news, fetch_headlines

load_dotenv()

# Initialize scheduler
scheduler = BackgroundScheduler()
'''
scheduler.add_job(
    func = fetch_crypto_data,
    trigger = IntervalTrigger(minutes = 5),
    id = 'crypto update',
    name = 'Update crypto data every 5 minutes'
)
scheduler.add_job(
    func = fetch_general_news,
    trigger = IntervalTrigger(minutes = 10),
    id = 'general news update',
    name='General news update every 10 minutes'
)

scheduler.add_job(
    func = fetch_headlines,
    trigger = IntervalTrigger(minutes = 10),
    id = 'headlines update',
    name='Headline update every 10 minutes'
)
'''
scheduler.start()

## run the function to fetch the data immediatly
fetch_crypto_data()
fetch_general_news()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints (routes)
app.register_blueprint(article_bp, url_prefix='/article')
app.register_blueprint(crypto_bp, url_prefix='/crypto')
app.register_blueprint(news_bp, url_prefix='/news')

##testing endpoint health
# Root endpoint
@app.route('/')
def home():
    return jsonify({
        'message': 'Daily Digest API is working',
        'endpoints': {
            'crypto': '/crypto',
            'news': '/news'
        }
    })
    return app

if __name__ == '__main__':
        ##app = create_app()
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5000))
    # Run the application
    app.run(host='0.0.0.0', port=port, debug=True)
    
# Clean shutdown
atexit.register(lambda: scheduler.shutdown())

""" cmd to run the backend: python3 -m backend.app"""
""" comd to install a new package: python3 -m pip install packageName"""