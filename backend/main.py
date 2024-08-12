from flask import Flask, request, redirect, url_for, render_template, flash
from flask_cors import CORS
from Firestore import FireStore

app = Flask(__name__)
CORS(app)