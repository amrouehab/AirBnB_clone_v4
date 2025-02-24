#!/usr/bin/python3
""" Starts a Flask web application """
from models import storage
from flask import Flask, render_template
from os import environ

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route('/4-hbnb')
def hbnb():
    """ Renders the 4-hbnb page """
    states = storage.all("State").values()
    amenities = storage.all("Amenity").values()
    return render_template("4-hbnb.html", states=states, amenities=amenities)

@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
