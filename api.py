# Class API - gives all connections via API interface

import requests
import json
import logging
import flask
from flask import Flask, abort, jsonify, make_response, url_for, redirect, request
from flask_cors import CORS
from modules.files import ReadFile
from modules.catchBlockList import GetBlockList, BlockListManagement
from threading import Thread
#import webview


debug = True

class API():
    def __init__(self, host, port):
        self.url = f"{host}:{port}"
    
    def __debug(self, request, method):
        print(f"{method} retrieved json:")
        print(request.text)
        
    def __get(self, method, endpoint):
        r = requests.get(f"{self.url}/{endpoint}")
        if debug: self.__debug(r,method)
        return r
    
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
    
def test_all():
    api = API("http://localhost",8888)
    api.getTrainer()
    api.getBag()
    api.getParty()
    api.getEncounterLog()
    api.getShinyLog()
    api.getEncounterRate()
    api.getStats()
    
#test_all()

pokedexList = json.loads(ReadFile("./modules/data/pokedex.json"))

api = API("http://localhost",8888)

def httpServer(api):
    """Run Flask server to make bot data available via HTTP GET"""
    

    
    try:
        log = logging.getLogger("werkzeug")
        log.setLevel(logging.ERROR)

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
                return jsonify(trainer)
            abort(503)

        @server.route("/bag", methods=["GET"])
        def Bag():
            bag = api.getBag()
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
            encounter_logs = api.getEncounterLog().json["encounter_log"]
            if len(encounter_logs) > 0 and encounter_logs[-1]["pokemon_obj"]:
                encounter = encounter_logs.pop()["pokemon_obj"]
                stats = api.getStats()
                if stats:
                    try:
                        encounter["stats"] = stats["pokemon"][encounter["name"]]
                        return jsonify(encounter)
                    except:
                        abort(503)
                return jsonify(encounter)
            abort(503)

        @server.route("/encounter_rate", methods=["GET"])
        def EncounterRate():
            try:
                return jsonify({"encounter_rate": api.getEncounterRate()})
            except:
                return jsonify({"encounter_rate": "-"})
            abort(503)

        @server.route("/emu", methods=["GET"])
        def Emu():
            emu = api.getEmu()
            if emu:
                return jsonify(emu)
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

        # TODO Missing route_list
        # @server.route("/routes", methods=["GET"])
        # def Routes():
        #     if route_list:
        #         return route_list
        #     else:
        #         abort(503)

        @server.route("/pokedex", methods=["GET"])
        def Pokedex():
            if pokedexList:
                return pokedexList
            abort(503)

        # @server.route("/config", methods=["POST"])
        # def Config():
        #    response = jsonify({})
        #    return response

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

        server.run(debug=False, threaded=True, host="localhost", port=8889)
    except Exception as e:
        log.debug(str(e))

Thread(target=httpServer(api)).start()

url = f"http://localhost:8889/dashboard"
#window = webview.create_window("PokeBot", url=url, width=700, height=600,text_select=True, zoomable=True)
#webview.start()