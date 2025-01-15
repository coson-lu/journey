from flask import Flask, request, redirect, url_for, render_template, flash, jsonify
from flask_cors import CORS
from Firestore import FireStore
from functools import wraps
from firebase_admin import auth # type: ignore
from update import Update
from datetime import datetime
from pytz import timezone # type: ignore

app = Flask(__name__)
CORS(app)

def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'No authorization token provided'}), 401
        
        try:
            # Remove 'Bearer ' from token
            id_token = auth_header.split(' ')[1]
            # Verify the token
            decoded_token = auth.verify_id_token(id_token)
            # Add user_id to request context
            request.user_id = decoded_token['uid']
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': str(e)}), 401
            
    return decorated_function

tz = timezone("America/Los_Angeles")
y, m, d = str(datetime.now(tz)).split()[0].split('-')
current_date = f'{int(m)}-{d}-{y}'

@app.route('/current')
@require_auth
def current():
    user_id = request.user_id  # Access the authenticated user's ID
    current_data = FireStore.read_document(user_id, current_date)  # Pass user_id to your database queries
    
    if current_data:
        return current_data
    else:
        return {}, 200

@app.route('/update', methods=['POST'])
@require_auth
def update_db():
    user_id = request.user_id
    activity = request.form['activity']
    duration = int(request.form['duration'])
    Update(user_id, current_date, activity, duration)
    return {}, 200

@app.route('/all')
@require_auth
def get_all_data():
    user_id = request.user_id
    all_data = FireStore.stream_collection(user_id)  # Pass user_id to get only this user's data
    return all_data
