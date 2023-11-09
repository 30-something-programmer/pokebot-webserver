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
    update_all();
    // Update all elements on the page - induce a delay to allow API call to complete via update_all()
    setTimeout(function(){
        document.getElementById("encounter_log").innerHTML = JSONTree.create(window.pokebot_encounter_log)
        document.getElementById("bag_log").innerHTML = JSONTree.create(window.pokebot_items)
        document.getElementById("party").innerHTML = JSONTree.create(window.pokebot_party)
        document.getElementById("emulator").innerHTML = JSONTree.create(window.pokebot_emulator)
        document.getElementById("stats").innerHTML = JSONTree.create(window.pokebot_stats)
        document.getElementById("shiny_log").innerHTML = JSONTree.create(window.pokebot_shiny_log)
        document.getElementById("trainer").innerHTML = JSONTree.create(window.pokebot_trainer)
        document.getElementById("encounter").innerHTML = JSONTree.create(window.pokebot_encounter)
        document.getElementById("encounter_rate").innerHTML = JSONTree.create(window.pokebot_encounter_rate)
        document.getElementById("pokedex").innerHTML = JSONTree.create(window.pokebot_pokedex)
        document.getElementById("blocked").innerHTML = JSONTree.create(window.pokebot_blocked)
    }, 1500);
    
    
}

debug_pokebot();
