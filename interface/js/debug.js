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

api_call("encounter_log", 10000); // From functions.js
api_call("trainer", 500); // From functions.js
api_call("shiny_log", 1000); // From functions.js
document.getElementById("trainer").innerHTML = JSONTree.create(window.trainer)
api_call("trainer", 500); // From functions.js
api_call("shiny_log", 1000); // From functions.js
api_call("stats", 1000); // From functions.js
api_call("emulator", 1000); // From functions.js
api_call("party", 500); // From functions.js
api_call("items", 500); // From functions.js