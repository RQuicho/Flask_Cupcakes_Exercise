"""Flask app for Cupcakes"""

from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
from config import *

app = Flask(__name__)

app.config.from_object("config")
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/api/cupcakes')
def data_all_cupcakes():
    """Get data for all cupcakes"""

    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes/<int:id>')
def data_single_cupcake(id):
    """Get data for one cupcake"""

    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())
