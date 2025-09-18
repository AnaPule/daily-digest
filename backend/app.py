from flask import Flask, jsonify
import os
from dotenv import load_dotenv  ## environment variables
from flask_cors import CORS  # For handling Cross-Origin Resource Sharing
load_dotenv()

## routes
    ##from backend.routes.article import article_bp
    ##from backend.routes.crypto import crypto_bp
from backend.routes import article_bp, crypto_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Register blueprints (routes)
app.register_blueprint(article_bp, url_prefix='/article')
app.register_blueprint(crypto_bp, url_prefix='/crypto')

##testing endpoint health
# Root endpoint
@app.route('/')
def home():
    return jsonify({
        'message': 'Daily Digest API is working',
        'endpoints': {
            'articles': '/article',
            'crypto': '/crypto',
        }
    })
    return app

if __name__ == '__main__':
        ##app = create_app()
    # Get port from environment variable or default to 5000
    port = int(os.getenv('PORT', 5000))
    # Run the application
    app.run(host='0.0.0.0', port=port, debug=True)
