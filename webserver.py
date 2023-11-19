import json
import logging
import flask
from threading import Thread

from flask import Flask, url_for, redirect, request
from flask_cors import CORS
from ruamel.yaml import YAML
from modules.files import ReadFile
from modules.catch_block_list import blockListManagement
from modules.runtime import getBasePath


log = logging.getLogger("werkzeug")
log.setLevel(logging.INFO)

yaml = YAML()
yaml.default_flow_style = False

pokedexList = json.loads(ReadFile(f"{getBasePath()}/modules/data/pokedex.json"))
blockedList = yaml.load(ReadFile(f"{getBasePath()}/data/catch_block_list.yml"))


def httpServer():
    """Run Flask server to make bot data available via HTTP GET"""
    
    try:
        server = Flask(__name__,static_folder="./interface")
        CORS(server)

        # Set the default route to redirect to dash
        @server.route("/")
        def Root():
            return redirect(url_for('Dashboard'))

        # Dashboard website
        @server.route("/dashboard", methods=["GET"])
        def Dashboard():
            return flask.render_template("dashboard.html")

        # Gives the user the pokedex page
        @server.route("/dashboard/pokedex", methods=["GET"])
        def DashboardPokedex():
            return flask.render_template("pokedex.html")

        # Gives the user the debug page
        @server.route("/dashboard/debug", methods=["GET"])
        def DashboardDebug():
            return flask.render_template("debug.html")
        
        # Returns the pokedex
        @server.route("/pokedex", methods=["GET"])
        def pokedex():
            return pokedexList
        
        # Updaetes the block list
        @server.route("/updateblocklist", methods=["POST"])
        def UpdateBlockList():
           data = request.json
           pkmName = data.get('pokemonName')
           sprite = data.get('spriteLoaded')
           catch = True
           if '-disabled' in sprite:
             catch = False
           else: catch = True
           blockListManagement(pkmName, catch)
           return "OK", 200

        # Returns the block list currently held by this webserver
        @server.route("/blocked", methods=["GET"])
        def Blocked():
            return blockedList

        # Run the webserver
        server.run(debug=True, threaded=True, host="localhost", port=8889)
    except Exception as e:
        log.debug(str(e))

httpServer()

# http://localhost:8888/dashboard"
