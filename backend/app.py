from flask import Flask, request, redirect, url_for, render_template, flash
from flask_cors import CORS
from Firestore import FireStore
from update import Update
from datetime import datetime

app = Flask(__name__)
CORS(app)

y, m, d = str(datetime.now()).split()[0].split('-')
current_date = f'{int(m)}-{d}-{y}'

@app.route('/current')
def current():
    current_data = FireStore.read_document(current_date)

    if current_data:
        return current_data
    else:
        return {}, 200

@app.route('/update', methods=['POST'])
def update_db():
    activity = request.form['activity']
    duration = int(request.form['duration'])
    
    Update(current_date, activity, duration)
    return {}, 200