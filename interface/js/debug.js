/*
* -----------------------------------------------------------------------------
* Debug JS 
* Version: 0.1
* Copyright, 30SomethingProgrammer
* Licensed under MIT
* -----------------------------------------------------------------------------
* The above notice must be included in its entirety when this file is used.
* This script is a modified version from https://github.com/40Cakes/pokebot-bizhawk
*/



// Call on all api endpoints and present them as json
function debug_pokebot() {
    api_call("encounter_log", 500); // From functions.js
    api_call("trainer", 500); // From functions.js
    api_call("shiny_log", 1000); // From functions.js
    api_call("stats", 1000); // From functions.js
    api_call("emulator", 1000); // From functions.js
    api_call("party", 500); // From functions.js
    api_call("items", 500); // From functions.js
    api_call("encounter_rate", 500); // From functions.js
    document.getElementById("encounter_log").innerHTML = JSONTree.create(window.encounter_log)
    document.getElementById("bag_log").innerHTML = JSONTree.create(window.items)
    document.getElementById("party").innerHTML = JSONTree.create(window.party)
    document.getElementById("emulator").innerHTML = JSONTree.create(window.emulator)
    document.getElementById("stats").innerHTML = JSONTree.create(window.stats)
    document.getElementById("shiny_log").innerHTML = JSONTree.create(window.shiny_log)
    document.getElementById("trainer").innerHTML = JSONTree.create(window.trainer)
    window.encounter = window.encounter_log.reverse()[0]
    document.getElementById("encounter").innerHTML = JSONTree.create(window.encounter)
    document.getElementById("encounter_rate").innerHTML = JSONTree.create(window.encounter_rate)
    
}

debug_pokebot();