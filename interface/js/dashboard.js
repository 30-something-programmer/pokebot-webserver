/*
* -----------------------------------------------------------------------------
* Dashboard JS 
* Version: 0.1
* Copyright, 30SomethingProgrammer
* Licensed under MIT
* -----------------------------------------------------------------------------
* The above notice must be included in its entirety when this file is used.
* This script is a modified version from https://github.com/40Cakes/pokebot-bizhawk
*/

// THIS SCRIPT USES FUNCTIONS.JS. ENSURE FUNCTIONS.JS IS CALLED FIRST

function update_trainer_details() {
    // Gets trainer details from the API then updates the relevant fields

    api_call("trainer", 500);  // from functions.js - updates window.trainer

    $("#trainer_id").text(window.trainer["tid"]);
    $("#trainer_secret").text(window.trainer["sid"]);
    $("#trainer_map_bank_id").text(
        window.trainer["map"][0] + ":" + window.trainer["map"][1]
    );
    $("#trainer_coords").text(
        "X " + window.trainer["coords"][0] + ", Y " + window.trainer["coords"][1]
    );
    $("#trainer_state").text(window.trainer["facing"]);

}

function update_item_details() {

    // Gets items from the API and updates the relevant fields

    api_call("items", 500)  // in functions.js

    let tr = ""

    let wrapper = document.getElementById("items_log")

    let condenseditems = []
    Object.entries(window.items).forEach(([key, value]) => {
        for (let j = 0; j < value.length; j++) {
            if (value[j]["name"] == "None" || value[j]["name"] == "unknown") continue

            if (!condensedItems[key]) {
                condensedItems[key] = []
            }

            if (condensedItem[key][value[j]["name"]]) {
                condensedItems[key][value[j]["name"]] += value[j]["quantity"]
            }
            else {
                condensedItems[key][value[j]["name"]] = value[j]["quantity"]
            }
        }

    })

    Object.entries(condensedItems).forEach(([key, value]) => {
        for (keyItems in value) {
            tr +=
                '<tr><td class="text-center"><img class="sprite32" src="/interface/sprites/Items/' +
                keyItems +
                '.png"></td><td class="text-center">' +
                keyItems +
                '</td></td><td class="text-center">' +
                key +
                '</td><td class="text-center">' +
                value[keyItems] +
                "</td></tr>"
        }
    })

    wrapper.innerHTML = tr

}

function update_current_encounter() {

    // Updates the current encounter deails

    // NOTE - window.encounter is updated every time get_encounter_log is called from functions.js

    $(".opponent_name").text(window.encounter["name"]);
    $("#health-bar-fill").css(
        "width",
        (window.encounter["stats"]["hp"] / window.encounter["stats"]["maxHP"]) * 100 + "%"
    );

    if (window.encounter["shiny"]) {
        $("#opponent_name").css("color", "gold");
        $("#opponent_shiny").text("Yes!");
        // If the pokemon hasn't changed, don't redraw the gif
        if ($("#opponent_personality").text() != window.encounter["pid"]) {
            $("#opponent_sprite").attr(
                "src",
                "https://img.pokemondb.net/sprites/black-white/anim/shiny/" + window.encounter["name"].toLowerCase() + ".gif"
            );
        }
        $("#opponent_shiny").css("color", "gold");
        $("#opponent_shiny_value").css("color", "gold");
    } else {
        $("#opponent_shiny").text("No");

        // If the pokemon hasn't changed, don't redraw the gif
        if ($("#opponent_personality").text() != window.encounter["pid"]) {
            $("#opponent_sprite").attr(
                "src",
                "https://img.pokemondb.net/sprites/black-white/anim/normal/" + window.encounter["name"].toLowerCase() + ".gif"
            );
        }
        $("#opponent_shiny").css("color", "red");
        $("#opponent_shiny_value").css("color", "red");
        $("#opponent_name").css("color", "");
    }

    $("#opponent_shiny_value").text(
        window.encounter["shinyValue"].toLocaleString()
    );
    $("#opponent_hidden_power_type").html(
        get_type_image(window.encounter["hiddenPower"])
    );
    $("#opponent_personality").text(window.encounter["pid"]);
    $("#opponent_hp").text(window.encounter["stats"]["hp"].toLocaleString());
    $("#opponent_hp_iv").text(window.encounter["IVs"]["hp"].toLocaleString());
    $("#opponent_attack").text(window.encounter["stats"]["attack"].toLocaleString());
    $("#opponent_attack_iv").text(window.encounter["IVs"]["attack"].toLocaleString());
    $("#opponent_defense").text(window.encounter["stats"]["defense"].toLocaleString());
    $("#opponent_defense_iv").text(window.encounter["IVs"]["defense"].toLocaleString());
    $("#opponent_spattack").text(window.encounter["stats"]["spAttack"].toLocaleString());
    $("#opponent_spattack_iv").text(window.encounter["IVs"]["spAttack"].toLocaleString());
    $("#opponent_spdef").text(window.encounter["stats"]["spDefense"].toLocaleString());
    $("#opponent_spdef_iv").text(window.encounter["IVs"]["spDefense"].toLocaleString());
    $("#opponent_speed").text(window.encounter["stats"]["speed"].toLocaleString());
    $("#opponent_speed_iv").text(window.encounter["IVs"]["speed"].toLocaleString());

    if (window.encounter["IVs"]["hp"] <= 15) {
        $("#opponent_hp_iv").css("color", "red");
    } else if (window.encounter["IVs"]["hp"] <= 30) {
        $("#opponent_hp_iv").css("color", "green");
    } else {
        $("#opponent_hp_iv").css("color", "gold");
    }
    if (window.encounter["IVs"]["attack"] <= 15) {
        $("#opponent_attack_iv").css("color", "red");
    } else if (window.encounter["IVs"]["attack"] <= 30) {
        $("#opponent_attack_iv").css("color", "green");
    } else {
        $("#opponent_attack_iv").css("color", "gold");
    }
    if (window.encounter["IVs"]["defense"] <= 15) {
        $("#opponent_defense_iv").css("color", "red");
    } else if (window.encounter["IVs"]["defense"] <= 30) {
        $("#opponent_defense_iv").css("color", "green");
    } else {
        $("#opponent_defense_iv").css("color", "gold");
    }
    if (window.encounter["IVs"]["spAttack"] <= 15) {
        $("#opponent_spattack_iv").css("color", "red");
    } else if (window.encounter["IVs"]["spAttack"] <= 30) {
        $("#opponent_spattack_iv").css("color", "green");
    } else {
        $("#opponent_spattack_iv").css("color", "gold");
    }
    if (window.encounter["IVs"]["spDefense"] <= 15) {
        $("#opponent_spdef_iv").css("color", "red");
    } else if (window.encounter["IVs"]["spDefense"] <= 30) {
        $("#opponent_spdef_iv").css("color", "green");
    } else {
        $("#opponent_spdef_iv").css("color", "gold");
    }
    if (window.encounter["IVs"]["speed"] <= 15) {
        $("#opponent_speed_iv").css("color", "red");
    } else if (window.encounter["IVs"]["speed"] <= 30) {
        $("#opponent_speed_iv").css("color", "green");
    } else {
        $("#opponent_speed_iv").css("color", "gold");
    }

    $("#opponent_level").text(window.encounter["level"]);
    $("#opponent_nature").text(window.encounter["nature"]);
    $("#opponent_location").text(window.encounter["metLocation"]);
    $("#opponent_item").text(window.encounter["item"]["name"]);
    $("#opponent_item_image").attr(
        "src",
        "/interface/sprites/items/" + window.encounter["item"]["name"] + ".png"
    );

    window.encounter["type"] = window.encounter["type"].filter((e) => e !== "Fairy");
    var types = "";
    types += get_type_image(window.encounter["type"][0])
    if (window.encounter["type"][1] != "") {
        types += get_type_image(window.encounter["type"][1])
    }

    $("#opponent_type").html(types);

    encounter["global_stats"]["phase_encounters"] = (window.encounter["global_stats"]["phase_encounters"] === undefined) ? 0 : window.encounter["global_stats"]["phase_encounters"];
    $("#opponent_phase_encounters").text(
        window.encounter["global_stats"]["phase_encounters"].toLocaleString()
    );

    window.encounter["global_stats"]["encounters"] = (window.encounter["global_stats"]["encounters"] === undefined) ? 0 : window.encounter["global_stats"]["encounters"];
    $("#opponent_encounters").text(
        window.encounter["global_stats"]["encounters"].toLocaleString()
    );

    window.encounter["global_stats"]["shiny_encounters"] = (window.encounter["global_stats"]["shiny_encounters"] === undefined) ? 0 : window.encounter["global_stats"]["shiny_encounters"];
    $("#opponent_shiny_encounters").text(
        window.encounter["global_stats"]["shiny_encounters"].toLocaleString()
    );

    window.encounter["global_stats"]["shiny_average"] = (window.encounter["global_stats"]["shiny_average"] === undefined) ? "-" : window.encounter["global_stats"]["shiny_average"];
    $("#opponent_shiny_average").text(
        window.encounter["global_stats"]["shiny_average"]
    );

    window.encounter["global_stats"]["phase_lowest_sv"] = (window.encounter["global_stats"]["phase_lowest_sv"] === undefined) ? 65535 : window.encounter["global_stats"]["phase_lowest_sv"];
    $("#opponent_phase_lowest_sv").text(
        window.encounter["global_stats"]["phase_lowest_sv"].toLocaleString()
    );

    if (window.encounter["global_stats"]["phase_lowest_sv"] < 8) {
        $("#opponent_phase_lowest_sv").css("color", "green");
    } else {
        $("#opponent_phase_lowest_sv").css("color", "red");
    }

    for (i of Array(4).keys()) {
        if (window.encounter["moves"][i]["name"] != "None") {
            $("#opponent_move_" + i).text(
                window.encounter["moves"][i]["name"]
            );
            $("#opponent_move_pp_" + i).text(
                window.encounter["moves"][i]["remaining_pp"] + "/" + window.encounter["moves"][i]["pp"]
            );
        } else {
            $("#opponent_move_" + i).text("-");
            $("#opponent_move_pp_" + i).text("-");
        }
    }
}

function update_encounter_log() {

    // Retrieves latest encounter log from the API and updates all the relevant details

    // Call on API for the encounter log
    api_call("encounter_log", 500);  // from functions.js - updates window.trainer

    window.encounter_log.reverse()  // Reverse the list so it shows correctly

    window.encounter = window.encounter_log[0]["pokemon"]   // Update with the most recent encoutner
    // Host tr to hold HTML
    var tr = "";

    // Loop through all pokemon, append date into HTML table
    for (var i = 0; i < 11; i++) {
        if (window.encounter_log[i]["pokemon"]) {
            if (window.encounter_log[i]["pokemon"]["shiny"]) {
                sprite_dir = "shiny/";
                sv_colour = "gold";

            } else {
                sprite_dir = "";
                sv_colour = "red";
            }

            tr +=
                '<tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                sprite_dir +
                window.encounter_log[i]["pokemon"]["name"] + '.png"></td><td class="text-center">' +
                window.encounter_log[i]["pokemon"]["name"] + '</td><td class="text-center">' +
                window.encounter_log[i]["pokemon"]["level"] + '</td><td class="text-center">' +
                window.encounter_log[i]["pokemon"]["nature"] + '</td><td class="text-center"><img title="' +
                window.encounter_log[i]["pokemon"]["item"]["name"] + '" class="sprite16" src="/interface/sprites/items/' +
                window.encounter_log[i]["pokemon"]["item"]["name"] + '.png"></td><td class="text-center"><code class="code">' +
                window.encounter_log[i]["pokemon"]["pid"] + '</code></td><td class="text-center" style="color:' +
                sv_colour + ';">' +
                window.encounter_log[i]["pokemon"]["shinyValue"].toLocaleString() +
                "</td></tr>";
        }
        document.getElementById("encounter_log").innerHTML = tr;
    }
}

function update_shiny_log() {
    // Retrieves the shiny log from the API and updates all the relevant details

    api_call("shiny_log", 500);     // in functions.js

    window.shiny_log.reverse();     // Reverse the shiny log so it shows in correct order

    var tr = "";
    var wrapper = document.getElementById("shiny_log");

    for (var i = 0; i < 25; i++) {
        if (window.shiny_log[i]) {
            if (window.shiny_log[i]["pokemon"]["shiny"]) {
                sprite_dir = "shiny/";
                sv_colour = "gold";
            } else {
                sprite_dir = "";
                sv_colour = "red";
            }
            tr +=
                '<tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                sprite_dir +
                window.shiny_log[i]["pokemon"]["name"] +
                '.png"></td><td class="text-center">' +
                window.shiny_log[i]["pokemon"]["name"] +
                '</td><td class="text-center">' +
                window.shiny_log[i]["pokemon"]["level"] +
                '</td><td class="text-center">' +
                window.shiny_log[i]["pokemon"]["nature"] +
                '</td><td class="text-center"><img title="' +
                window.shiny_log[i]["pokemon"]["itemName"] +
                '" class="sprite16" src="/interface/sprites/items/' +
                window.shiny_log[i]["pokemon"]["itemName"] +
                '.png"></td><td class="text-center"><code class="code">' +
                window.shiny_log[i]["pokemon"]["personality"] +
                '</code></td><td class="text-center" style="color:' +
                sv_colour +
                ';">' +
                window.shiny_log[i]["pokemon"]["shinyValue"].toLocaleString() +
                "</td></tr>";
        }
    }

    wrapper.innerHTML = tr;
}

function update_stats() {
    // Retrieves stats from the API and updates all the relevant details

    api_call("stats", 500);     // in functions.js

    window.stats["totals"]["phase_encounters"] = (window.stats["totals"]["phase_encounters"] === undefined) ? 0 : window.stats["totals"]["phase_encounters"];
    $("#stats_phase_encounters").text(
        window.stats["totals"]["phase_encounters"].toLocaleString()
    );

    window.stats["totals"]["shiny_encounters"] = (window.stats["totals"]["shiny_encounters"] === undefined) ? 0 : window.stats["totals"]["shiny_encounters"];
    $("#stats_shiny_encounters").text(
        window.stats["totals"]["shiny_encounters"].toLocaleString()
    );

    window.stats["totals"]["shiny_encounters"] = (window.stats["totals"]["shiny_encounters"] === undefined) ? 0 : window.stats["totals"]["shiny_encounters"];
    $("#stats_total_encounters").text(
        window.stats["totals"]["encounters"].toLocaleString()
    );

    window.stats["totals"]["shiny_average"] = (window.stats["totals"]["shiny_average"] === undefined) ? "-" : window.stats["totals"]["shiny_average"];
    $("#stats_shiny_average").text(
        window.stats["totals"]["shiny_average"]
    );

    window.stats["totals"]["shortest_phase_encounters"] = (window.stats["totals"]["shortest_phase_encounters"] === undefined) ? 0 : window.stats["totals"]["shortest_phase_encounters"];
    $("#stats_shortest_phase").text(
        window.stats["totals"]["shortest_phase_encounters"].toLocaleString()
    );

    window.stats["totals"]["longest_phase_encounters"] = (window.stats["totals"]["longest_phase_encounters"] === undefined) ? 0 : window.stats["totals"]["longest_phase_encounters"];
    $("#stats_longest_phase").text(
        window.stats["totals"]["longest_phase_encounters"].toLocaleString()
    );
}

function update_emulator() {
    // Retrieves emulator stuffs from the API and updates all the relevant details

    emu = get_emulator();   // in function.js

}

// Run regular updates on each function

window.setInterval(function () {
    update_shiny_log();
}, 2500);

window.setInterval(function () {
    update_encounter_log();
}, 2500);

window.setInterval(function () {
    update_current_encounter();
}, 250);

window.setInterval(function () {
    update_trainer_details();
}, 500);

window.setInterval(function () {
    update_stats();
}, 1000);

window.setInterval(function () {
    update_items();
}, 2500);

window.setInterval(function () {
    update_emulator();
}, 250);

update_shiny_log();
update_encounter_log();
update_current_encounter();  // Make sure this is AFTER update_encounter_log
update_trainer_details();
update_items();
update_emulator();
update_stats;


