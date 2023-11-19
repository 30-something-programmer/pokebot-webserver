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
function update_debug_elements() {

    // Update elements only if:
    // 1. The inner HTML is EMPTY
    // 2. The window element is NOT EMPTY

    // Encounter log
    if ((document.getElementById("encounter_log").innerHTML == "") && (window.pokebot_encounter_log != null)) {
        document.getElementById("encounter_log").innerHTML = JSONTree.create(window.pokebot_encounter_log)
    }

    // Items
    if ((document.getElementById("bag_log").innerHTML == "") && (window.pokebot_items != null)) {
        document.getElementById("bag_log").innerHTML = JSONTree.create(window.pokebot_items)
    }

    // Party
    if ((document.getElementById("party").innerHTML == "") && (window.pokebot_party != null)) {
        document.getElementById("party").innerHTML = JSONTree.create(window.pokebot_party)
    }

    // Emulator
    if ((document.getElementById("emulator").innerHTML == "") && (window.pokebot_emulator != null)) {
        document.getElementById("emulator").innerHTML = JSONTree.create(window.pokebot_emulator)
    }

    // Stats
    if ((document.getElementById("stats").innerHTML == "") && (window.pokebot_stats != null)) {
        document.getElementById("stats").innerHTML = JSONTree.create(window.pokebot_stats)
    }

    // Shiny Log
    if ((document.getElementById("shiny_log").innerHTML == "") && (window.pokebot_shiny_log != null)) {
        document.getElementById("shiny_log").innerHTML = JSONTree.create(window.pokebot_shiny_log)
    }

    // Trainer
    if ((document.getElementById("trainer").innerHTML == "") && (window.pokebot_trainer != null)) {
        document.getElementById("trainer").innerHTML = JSONTree.create(window.pokebot_trainer)
    }

    // Encounter
    if ((document.getElementById("encounter").innerHTML == "") && (window.pokebot_encounter != null)) {
        document.getElementById("encounter").innerHTML = JSONTree.create(window.pokebot_encounter)
    }

    // Encounter Rate
    if ((document.getElementById("encounter_rate").innerHTML == "") && (window.pokebot_encounter_rate != null)) {
        document.getElementById("encounter_rate").innerHTML = JSONTree.create(window.pokebot_encounter_rate)
    }

    // Pokedex
    if ((document.getElementById("pokedex").innerHTML == "") && (window.pokebot_pokedex != null)) {
        document.getElementById("pokedex").innerHTML = JSONTree.create(window.pokebot_pokedex)
    }

    // Blocked
    if ((document.getElementById("blocked").innerHTML == "") && (window.pokebot_blocked != null)) {
        document.getElementById("blocked").innerHTML = JSONTree.create(window.pokebot_blocked)
    }
}

// Constantly update the elements to show once the var has been updated
window.setInterval(function () { update_debug_elements(); }, 2000);

