/*
* Header JS-----------------------------------------------------------------------------
* 
* Version: 0.1
* Copyright, 30SomethingProgrammer
* Licensed under MIT
* -----------------------------------------------------------------------------
* The above notice must be included in its entirety when this file is used.
* This script is a modified version from https://github.com/40Cakes/pokebot-bizhawk
*/

// Update stats within the header
function header_stats() {
    
    api_call("stats", 500)
    api_call("emulator", 500)
    $("#nav_stat_phase").text(
        window.stats["totals"]["phase_encounters"].toLocaleString()
    );
    $("#nav_stat_total").text(window.stats["totals"]["encounters"].toLocaleString());

    window.stats["totals"]["shiny_encounters"] = (window.stats["totals"]["shiny_encounters"] === undefined) ? 0 : window.stats["totals"]["shiny_encounters"];
    $("#nav_stat_shiny").text(
        window.stats["totals"]["shiny_encounters"].toLocaleString()
    );
    $("#nav_emu").text(window.emulator["game"]["name"])

}

// encounter log for encounters/hr
function header_encounter_rate() {
    api_call("encounter_rate",100)
    $("#encounters_hour").text(window.encounter_rate["encounter_rate"].toLocaleString() + "/h");

}

// needed for encounters/hr calculation,
// phase encounters/total encounters/shinys
window.setInterval(function() {
    header_encounter_rate();
    header_stats();
}, 2500);

header_encounter_rate();
header_stats();