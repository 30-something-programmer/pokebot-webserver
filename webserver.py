import json
import logging
import flask
from flask import Flask, abort, jsonify, url_for, redirect, request
from flask_cors import CORS
from modules.files import ReadFile

log = logging.getLogger("werkzeug")
log.setLevel(logging.INFO)

pokedexList = json.loads(ReadFile("./modules/data/pokedex.json"))

def httpServer():
    """Run Flask server to make bot data available via HTTP GET"""
    
    try:
        server = Flask(__name__,static_folder="./interface")
        CORS(server)

        @server.route("/")
        def Root():
            return redirect(url_for('Dashboard'))

        @server.route("/dashboard", methods=["GET"])
        def Dashboard():
            return flask.render_template("dashboard.html")

        @server.route("/dashboard/pokedex", methods=["GET"])
        def DashboardPokedex():
            return flask.render_template("pokedex.html")

        @server.route("/dashboard/debug", methods=["GET"])
        def DashboardDebug():
            return flask.render_template("debug.html")
        
        @server.route("/pokedex", methods=["GET"])
        def pokedex():
            return json.loads(ReadFile("./modules/data/pokedex.json"))

        server.run(debug=True, threaded=True, host="localhost", port=8889)
    except Exception as e:
        log.debug(str(e))

httpServer()

# http://localhost:8888/dashboard"
