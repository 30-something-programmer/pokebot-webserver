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

ws = new WebSocket("ws://localhost:8887");
window.pokebot_host2 = "http://localhost:8889";
window.pokebot_encounter_log = null;
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

ws.onopen = function (e) {
    console.log("Pokebot websocket connected")
    ws.send('KeepAlive')
    ws.send("tr");   // Trainer
    ws.send("el");   // Encounter log
    ws.send("it");   // Items
    ws.send("em");   // Emulator
    ws.send("pa");   // Party
    ws.send("sh");   // Shiny log
    ws.send("st");   // Stats
    ws.send("er");   // Encounter rate
    ws.send("fps");
    return false;
};
ws.onclose


// Update variables when receiving update
ws.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
    var obj = JSON.parse(event.data);
    window_name = "pokebot_" + obj["type"]
    window[window_name] = obj["data"]
    return false;
};

ws.onclose = function (event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
    }
};