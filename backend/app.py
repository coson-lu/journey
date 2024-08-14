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
    return FireStore.read_document(current_date)

@app.route('/update', methods=['POST'])
def update_db():
    pass