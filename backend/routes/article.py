import pymongo
from flask import Blueprint, jsonify
from datetime import date, timedelta

## from backend.database.db import getdatabase # Absolute import
from ..database.db import getdatabase

article_bp = Blueprint('article', __name__)
db = getdatabase()

##get method for articles: top 5 headline articles
@article_bp.route('/', methods=['GET'])
def getArticles():
    ## Get articles from last 7 days
    start_of_week = date.today() - timedelta(days=date.today().weekday())
    end_of_week = date.today() + timedelta(days=date.today().weekday())

    try:
        articles = list(
            db.general.find({
                'pubDate': {'$gte': start_of_week.isoformat()}
            }, {'_id': 0})
            .sort('pubDate', pymongo.ASCENDING)
            #.distinct('title')
            ##.limit(30)
        )

        return jsonify({
            'status': '200',
            'general': articles
         })
    except Exception as e:
        print(f'An error has occurred: {e}')
        return jsonify({
            'status': '500',
            'message': f'An error has occurred: {e}'
        })