from flask import Flask, request, redirect, url_for, render_template, flash
from flask_cors import CORS
from Firestore import FireStore
from update import Update
import datetime

app = Flask(__name__)
CORS(app)

y, m, d = str(datetime.datetime.now()).split()[0].split('-')

@app.route('/current')
def current():
    return FireStore.read_document(FireStore.read_document(f'{int(m)}-{d}-{y}'))