# Class API - gives all connections via API interface

import requests
from requests.exceptions import HTTPError
import json
import logging
import flask
from flask import Flask, abort, jsonify, make_response, url_for, redirect, request
from flask_cors import CORS
from modules.files import ReadFile
from modules.catchBlockList import GetBlockList, BlockListManagement
from threading import Thread
#import webview


debug = False

log = logging.getLogger("werkzeug")
log.setLevel(logging.INFO)

class API():
    def __init__(self, host, port):
        self.url = f"{host}:{port}"     
        
    def __get(self, method, endpoint):
        
        try:
            log.debug(f"GET request for {method}")
            r = requests.get(f"{self.url}/{endpoint}")
            # Write out debug if enabled
            log.debug(f"SUCCESS!! - {method} retrieved json - code {r.status_code}")
            r.json()
            return r.json()
        
        except HTTPError as http_err:
            log.error(f"HTTP error occurred:\nerror:{http_err}-- Endpoint:{endpoint} ")
        except Exception as err:
            log.error(f"Error occurred:\nerror:{err} -- Endpoint:{endpoint} ")
    
    def getTrainer(self):
        return self.__get("getTrainer","/trainer")
    
    def getBag(self):
        return self.__get("getBag","/items") 
    
    def getParty(self):
        return self.__get("getParty","/party")
    
    def getEncounterLog(self):
        return self.__get("getEncounterLog","/encounter_log")
    
    def getShinyLog(self):
        return self.__get("getShinyLog","/shiny_log")
    
    def getEncounterRate(self):
        return self.__get("getEncounterRate","/encounter_rate")
    
    def getStats(self):
        return self.__get("getStats","/stats")
    
    
pokedexList = json.loads(ReadFile("./modules/data/pokedex.json"))

api = API("http://localhost",8888)

def httpServer(api : API):
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

        @server.route("/trainer", methods=["GET"])
        def Trainer():
            trainer = api.getTrainer()
            if trainer:
                return trainer
            abort(503)

        @server.route("/items", methods=["GET"])
        def Items():
            bag = api.getItems()
            if bag:
                return jsonify(bag)
            abort(503)

        @server.route("/party", methods=["GET"])
        def Party():
            party = api.getParty()
            if party:
                return jsonify(party)
            abort(503)

        @server.route("/encounter", methods=["GET"])
        def Encounter():
            encounter_logs = api.getEncounterLog()
            encounter = encounter_logs[-1]["pokemon"]
            stats = api.getStats()
            if stats:
                try:
                    encounter["global_stats"] = stats["pokemon"][encounter["name"]]
                    return jsonify(encounter)
                except:
                    abort(503)
            return encounter
                
        @server.route("/encounter_rate", methods=["GET"])
        def EncounterRate():
            try:
                return jsonify({"encounter_rate": api.getEncounterRate()})
            except:
                return jsonify({"encounter_rate": "-"})
            abort(503)

        @server.route("/stats", methods=["GET"])
        def Stats():
            stats = api.getStats()
            if stats:
                return jsonify(stats)
            abort(503)

        @server.route("/encounter_log", methods=["GET"])
        def EncounterLog():
            return api.getEncounterLog()

        @server.route("/shiny_log", methods=["GET"])
        def ShinyLog():
            shiny_log = api.getShinyLog()
            if shiny_log:
                return jsonify(shiny_log)
            abort(503)

        @server.route("/pokedex", methods=["GET"])
        def Pokedex():
            if pokedexList:
                return pokedexList
            abort(503)

        @server.route("/updateblocklist", methods=["POST"])
        def UpdateBlockList():
           data = request.json
           pkmName = data.get('pokemonName')
           sprite = data.get('spriteLoaded')
           catch = True
           if '-disabled' in sprite:
             catch = False
           else: catch = True
           BlockListManagement(pkmName, catch)
           return "OK", 200

        @server.route("/blocked", methods=["GET"])
        def Blocked():
            block_list = GetBlockList()
            return block_list

        server.run(debug=True, threaded=True, host="localhost", port=8889)
    except Exception as e:
        log.debug(str(e))

httpServer(api)

# http://localhost:8889/dashboard"
