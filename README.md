# Daily Digest

# Clone and setup
git clone <repository-url>

cd daily-digest
  python3 -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

  DATABASE=daily-digest-db
  
  NEWS_API_KEY=your_newsapi_key_here
  HEADLINES_NEWS_API_KEY=your_headline_api_key_here
  CRYPTO_CURRENCY_API_KEY=your_cryptoapi_key_here
  MONGODB_URI=mongodb://localhost:27017/daily_digest

  CRYPTO_CURRENCY_LATEST_URL=https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest

# Run the digest
  python daily_digest.py

## Get free API keys:
  GeneralNewsAPI -  NEWS_ARRTICLES_URL=https://newsapi.org/v2/everything?1=tesla&from=2025=08-17&sortBy=publishedAt&apiKey=095ce3f8fae4999aa887b40c2c25aec
  HeadlineNewsAPI - https://mediastack.com/
  CryptoCoinAPI - https://coinmarketcap.com/api/

## Features
  - Multi-source data collection from public APIs
  - MongoDB storage with timestamps
  - Error handling for API failures
  - Daily-ready structure for cron scheduling
  - Simple console output with colored formatting
  - Simple user friendly frontend

## Learning Goals 
  - Python Fundamentals: Virtual envs, packages, syntax
  - API Integration: HTTP requests, JSON parsing
  - MongoDB Basics: PyMongo, CRUD operations, document structure
  - Error Handling: Try-catch, API failure management
  - Environment Configuration: API keys, secure configuration

## Time Allocation
  - Estimated Duration: 2-3 days
  - Focus: Python syntax, MongoDB basics, expansion for react experience

# Deployment
- Frontend: Vercel
- Backend: render
- database: mongoDB Atlas with AWS as the host
