
from datetime import date, timedelta
from flask import Blueprint, jsonify
from backend.database.db import getdatabase

crypto_bp = Blueprint('crypto', __name__)
db = getdatabase()

@crypto_bp.route('/', methods=['GET'])
def get_crypto():
    start_of_week = date.today() - timedelta(days=date.today().weekday())
    try:
        # Get latest crypto data
        crypto_data = list(
            db.cryptocurrency
            .find({}, {'_id': 0})
            .sort('timestamp', -1)
            .limit(100))

        return jsonify({
            'status': '200',
            'crypto': crypto_data
        })
    except Exception as e:
        return (jsonify({
            'error': str(e)}),
            500
        )