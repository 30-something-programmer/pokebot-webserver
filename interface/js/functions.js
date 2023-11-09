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
function update_encounter() {
    if (!!window.pokebot_encounter_log){
        window.pokebot_encounter = window.pokebot_encounter_log[0]
}}
function update_pokedex() { 
    api_call("pokedex", 10000, window.pokebot_host2, false); 
}

function update_encounter_log() { 
    api_call("encounter_log", 500, window.pokebot_host, true);
    update_encounter(); 
}

function update_trainer() {
    api_call("trainer", 1000, window.pokebot_host, false); 
}
function update_shiny_log(){
    api_call("shiny_log", 1000, window.pokebot_host, true);
}

function update_stats() {
    api_call("stats", 1000, window.pokebot_host, false); 
}

function update_emulator() {
    api_call("emulator", 1000, window.pokebot_host, false); 
}

function update_party() {
    api_call("party", 1000, window.pokebot_host, false); 
}

function update_items() {
    api_call("items", 1000, window.pokebot_host, false); 
}

function update_encounter_rate() {
    api_call("encounter_rate", 500, window.pokebot_host, false);
}

function update_fps() {
    api_call("fps", 500, window.pokebot_host, false);
}
function update_blocked() {
    api_call("blocked", 500, window.pokebot_host2, false);
}
// Provide function for attaining image type
function get_type_image(type_str) {
    return `<img src=\"/interface/sprites/types/${type_str}.png\">`;
}

function update_all(){
    update_pokedex();
    update_encounter_log();
    update_encounter_rate();
    update_blocked();
    update_emulator();
    update_fps();
    update_items();
    update_party();
    update_shiny_log();
    update_stats();
    update_trainer();
}
update_all();