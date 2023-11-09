/*
* -----------------------------------------------------------------------------
* Functions JS 
* Version: 0.1
* Copyright, 30SomethingProgrammer
* Licensed under MIT
* -----------------------------------------------------------------------------
* The above notice must be included in its entirety when this file is used.
* This script is a modified version from https://github.com/40Cakes/pokebot-bizhawk
*/


window.pokebot_host = "http://localhost:8888";
window.pokebot_host2 = "http://localhost:8889";
window.pokebot_encounter_log = {
    "encounter_rate": 1016
    };
window.pokebot_encounter_rate = null;
window.pokebot_encounter = null;
window.pokebot_emulator = null;
window.pokebot_trainer = null;
window.pokebot_stats = null;
window.pokebot_shiny_log = null;
window.pokebot_items = null;
window.pokebot_party = null;
window.pokebot_fps = null;
window.pokebot_blocked = null;
window.pokebot_pokedex = null;

function api_call(call, time, host, reversed) {
    // Call on the API and pass the return back to the caller
    $.ajax({
        method: "GET",
        url: host + "/" + call,
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: time,
        async: true,
    }).done(function (api_call) {
        window_name = "pokebot_" + call
        window[window_name] = api_call
        if (reversed){
            window[window_name].reverse()
        }
    });
}

function api_call_pokedex() { 
    api_call("pokedex", 10000, window.pokebot_host2, false); 
}

function api_call_encounter_log() { 
    // Adds to global variable the encounter log and updates latest encounter
    api_call("encounter_log", 1000, window.pokebot_host, true);

    // Update the current encounter to be the last pokemon encountered - delayed to afford time to API to complete call
    setTimeout(function(){ 
        window.pokebot_encounter = window.pokebot_encounter_log[0]["pokemon"]
    }, 1000);
}

function api_call_trainer() {
    api_call("trainer", 1000, window.pokebot_host, false); 
}
function api_call_shiny_log(){
    api_call("shiny_log", 1000, window.pokebot_host, true);
}

function api_call_stats() {
    api_call("stats", 1000, window.pokebot_host, false); 
}

function api_call_emulator() {
    api_call("emulator", 1000, window.pokebot_host, false); 
}

function api_call_party() {
    api_call("party", 1000, window.pokebot_host, false); 
}

function api_call_items() {
    api_call("items", 1000, window.pokebot_host, false); 
}

function api_call_encounter_rate() {
    api_call("encounter_rate", 500, window.pokebot_host, false);
}

function api_call_fps() {
    api_call("fps", 500, window.pokebot_host, false);
}
function api_call_blocked() {
    api_call("blocked", 500, window.pokebot_host2, false);
}
// Provide function for attaining image type
function get_type_image(type_str) {
    return `<img src=\"/interface/sprites/types/${type_str}.png\">`;
}

function api_call_dash_html(){
    api_call_encounter_log();
    api_call_items();
    api_call_party();
    api_call_shiny_log();
    api_call_trainer();
}

function api_call_header_html(){
    api_call_encounter_rate();
    api_call_emulator();
    api_call_fps();
    api_call_stats();
}

function api_call_pokedex_html(){
    api_call_pokedex();
    api_call_blocked();
}

function api_call_debug_html(){
    api_call_pokedex();
    api_call_encounter_log();
    api_call_blocked();
    api_call_items();
    api_call_party();
    api_call_shiny_log();
    api_call_trainer();
}