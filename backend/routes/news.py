import pymongo
from flask import Blueprint, jsonify
from datetime import date, timedelta

from ..database.db import getdatabase ## relative import

news_bp = Blueprint('news', __name__)
db = getdatabase()

@news_bp.route('/headlines', methods=['GET'])
def getHeadlines():
    ## Get headlines from last 7 days
    start_of_week = date.today() - timedelta(days=date.today().weekday())
    end_of_week = date.today() + timedelta(days=date.today().weekday())

    try:
        news = list(
            db.news.find({
                'published_at': {'$gte': start_of_week.isoformat()}
            }, {'_id': 0})
            .sort('pubDate', pymongo.ASCENDING)
            .limit(10)
        )

        return jsonify({
            'status': '200',
            'headlines': news
         })
    except Exception as e:
        print(f'An error has occurred: {e}')
        return jsonify({
            'status': '500',
            'message': f'An error has occurred: {e}'
        })

@news_bp.route('/general', methods=['GET'])     
def getGeneral():
    ## Get articles from last 7 days
    start_of_week = date.today() - timedelta(days=date.today().weekday())
    end_of_week = date.today() + timedelta(days=date.today().weekday())

    try:
        articles = list(
            db.general.find({
                'pubDate': {'$gte': start_of_week.isoformat()}
            }, {'_id': 0})
            .sort('pubDate', pymongo.ASCENDING)
            .limit(10)
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