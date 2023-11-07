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
window.encounter = null;    // Host the encounter as a global variable
window.encounter_log = null;
window.trainer = null;
window.stats = null;
window.emulator = null;
window.shiny_log = null;
window.items = null;

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
function get_type_image(type_str) {
    return `<img src=\"/interface/sprites/types/${type_str}.png\">`;
}
