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


window.host = "http://localhost:8888";
window.host2 = "http://localhost:8889";
window.encounter_log = null;
window.emulator = null;
window.trainer = null;
window.stats = null;
window.emulator = null;
window.shiny_log = null;
window.items = null;
window.party = null;
window.encounter_rate = null;
window.fps = null;

function api_call(call, time) {
    // Call on the API and pass the return back to the caller
    $.ajax({
        method: "GET",
        url: window.host + "/" + call,
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: time,
    }).done(function (api_call) {

        window[call] = api_call
    });
}

// Fill all window elements
api_call("encounter_log", 500); 
api_call("trainer", 500); 
api_call("shiny_log", 1000); 
api_call("stats", 1000); 
api_call("emulator", 1000); 
api_call("party", 500); 
api_call("items", 500); 
api_call("encounter_rate", 100);
api_call("fps", 100);
window.encounter = window.encounter_log.reverse()[0]

// Provide function for attaining image type
function get_type_image(type_str) {
    return `<img src=\"/interface/sprites/types/${type_str}.png\">`;
}