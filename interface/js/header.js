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
function update_header_elements() {

    $("#nav_stat_phase").text(
        window.pokebot_stats["totals"]["phase_encounters"].toLocaleString()
    );
    $("#nav_stat_total").text(window.pokebot_stats["totals"]["encounters"].toLocaleString());

    window.pokebot_stats["totals"]["shiny_encounters"] = (window.pokebot_stats["totals"]["shiny_encounters"] === undefined) ? 0 : window.pokebot_stats["totals"]["shiny_encounters"];
    $("#nav_stat_shiny").text(
        window.pokebot_stats["totals"]["shiny_encounters"].toLocaleString()
    );
    $("#nav_emu").text(window.pokebot_emulator["game"]["name"])


    $("#encounters_hour").text(window.pokebot_encounter_rate["encounter_rate"].toLocaleString() + "/h");

}
