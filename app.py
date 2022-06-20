"""Flask app for Cupcakes"""

import re
from flask import Flask, jsonify, request

from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)
db.create_all()


@app.get('/api/cupcakes')
def get_cupcakes():
    """get data about all cupcakes, return JSON"""

    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]

    return jsonify(cupcakes=cupcakes)


@app.get('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """get data about a single cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized_cupcake = cupcake.serialize()

    return jsonify(cupcake=serialized_cupcake)


@app.post('/api/cupcakes')
def create_cupcake():
    """create a cupcake, returns JSON with cupcake data"""

    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image = request.json['image']

    cupcake = Cupcake(
        flavor=flavor,
        size=size,
        rating=rating,
        image=image
    )

    db.session.add(cupcake)
    db.session.commit()

    serialized_cupcake = cupcake.serialize()

    return (jsonify(cupcake=serialized_cupcake), 201)
