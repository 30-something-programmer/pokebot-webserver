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

function update_dash_trainer_elements() {
    // Gets trainer details from the API then updates the relevant fields

    $("#trainer_id").text(window.pokebot_trainer["tid"]);
    $("#trainer_secret").text(window.pokebot_trainer["sid"]);
    $("#trainer_map_bank_id").text(
        window.pokebot_trainer["map"][0] + ":" + window.pokebot_trainer["map"][1]
    );
    $("#trainer_coords").text(
        "X " + window.pokebot_trainer["coords"][0] + ", Y " + window.pokebot_trainer["coords"][1]
    );
    $("#trainer_state").text(window.pokebot_trainer["facing"]);

}

function update_dash_item_elements() {

    // Gets items from the API and updates the relevant fields

    let tr = ""

    let wrapper = document.getElementById("items_log")

    let condenseditems = []
    Object.entries(window.pokebot_items).forEach(([key, value]) => {
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

function update_dash_current_encounter_elements() {
    // Updates the current encounter deails

    $(".opponent_name").text(window.pokebot_encounter["name"]);
    $("#health-bar-fill").css(
        "width",
        (window.pokebot_encounter["stats"]["hp"] / window.pokebot_encounter["stats"]["maxHP"]) * 100 + "%"
    );

    // Clear up the pokemon name by replacing chars that don't work nicely with other markups
    var cleaned_pokemon_name = window.pokebot_encounter["name"]
        .replaceAll("'", "")
        .replaceAll("♀", "_F")
        .replaceAll("♂", "_M");
    
    if (window.pokebot_encounter["shiny"]) {
        $("#opponent_name").css("color", "gold");
        $("#opponent_shiny").text("Yes!");
        // If the pokemon hasn't changed, don't redraw the gif
        if ($("#opponent_personality").text() != window.pokebot_encounter["pid"]) {
            $("#opponent_sprite").attr(
                "src",
                "https://img.pokemondb.net/sprites/black-white/anim/shiny/" + window.pokebot_encounter["name"].toLowerCase() + ".gif"
            );
        }
        $("#opponent_shiny").css("color", "gold");
        $("#opponent_shiny_value").css("color", "gold");
    } else {
        $("#opponent_shiny").text("No");

        // If the pokemon hasn't changed, don't redraw the gif
        if ($("#opponent_personality").text() != window.pokebot_encounter["pid"]) {
            $("#opponent_sprite").attr(
                "src",
                "https://img.pokemondb.net/sprites/black-white/anim/normal/" + window.pokebot_encounter["name"].toLowerCase() + ".gif"
            );
        }
        $("#opponent_shiny").css("color", "red");
        $("#opponent_shiny_value").css("color", "red");
        $("#opponent_name").css("color", "");
    }

    $("#opponent_shiny_value").text(
        window.pokebot_encounter["shinyValue"].toLocaleString()
    );
    $("#opponent_hidden_power_type").html(
        get_type_image(window.pokebot_encounter["hiddenPower"])
    );
    $("#opponent_personality").text(window.pokebot_encounter["pid"]);
    $("#opponent_hp").text(window.pokebot_encounter["stats"]["hp"].toLocaleString());
    $("#opponent_hp_iv").text(window.pokebot_encounter["IVs"]["hp"].toLocaleString());
    $("#opponent_attack").text(window.pokebot_encounter["stats"]["attack"].toLocaleString());
    $("#opponent_attack_iv").text(window.pokebot_encounter["IVs"]["attack"].toLocaleString());
    $("#opponent_defense").text(window.pokebot_encounter["stats"]["defense"].toLocaleString());
    $("#opponent_defense_iv").text(window.pokebot_encounter["IVs"]["defense"].toLocaleString());
    $("#opponent_spattack").text(window.pokebot_encounter["stats"]["spAttack"].toLocaleString());
    $("#opponent_spattack_iv").text(window.pokebot_encounter["IVs"]["spAttack"].toLocaleString());
    $("#opponent_spdef").text(window.pokebot_encounter["stats"]["spDefense"].toLocaleString());
    $("#opponent_spdef_iv").text(window.pokebot_encounter["IVs"]["spDefense"].toLocaleString());
    $("#opponent_speed").text(window.pokebot_encounter["stats"]["speed"].toLocaleString());
    $("#opponent_speed_iv").text(window.pokebot_encounter["IVs"]["speed"].toLocaleString());

    if (window.pokebot_encounter["IVs"]["hp"] <= 15) {
        $("#opponent_hp_iv").css("color", "red");
    } else if (window.pokebot_encounter["IVs"]["hp"] <= 30) {
        $("#opponent_hp_iv").css("color", "green");
    } else {
        $("#opponent_hp_iv").css("color", "gold");
    }
    if (window.pokebot_encounter["IVs"]["attack"] <= 15) {
        $("#opponent_attack_iv").css("color", "red");
    } else if (window.pokebot_encounter["IVs"]["attack"] <= 30) {
        $("#opponent_attack_iv").css("color", "green");
    } else {
        $("#opponent_attack_iv").css("color", "gold");
    }
    if (window.pokebot_encounter["IVs"]["defense"] <= 15) {
        $("#opponent_defense_iv").css("color", "red");
    } else if (window.pokebot_encounter["IVs"]["defense"] <= 30) {
        $("#opponent_defense_iv").css("color", "green");
    } else {
        $("#opponent_defense_iv").css("color", "gold");
    }
    if (window.pokebot_encounter["IVs"]["spAttack"] <= 15) {
        $("#opponent_spattack_iv").css("color", "red");
    } else if (window.pokebot_encounter["IVs"]["spAttack"] <= 30) {
        $("#opponent_spattack_iv").css("color", "green");
    } else {
        $("#opponent_spattack_iv").css("color", "gold");
    }
    if (window.pokebot_encounter["IVs"]["spDefense"] <= 15) {
        $("#opponent_spdef_iv").css("color", "red");
    } else if (window.pokebot_encounter["IVs"]["spDefense"] <= 30) {
        $("#opponent_spdef_iv").css("color", "green");
    } else {
        $("#opponent_spdef_iv").css("color", "gold");
    }
    if (window.pokebot_encounter["IVs"]["speed"] <= 15) {
        $("#opponent_speed_iv").css("color", "red");
    } else if (window.pokebot_encounter["IVs"]["speed"] <= 30) {
        $("#opponent_speed_iv").css("color", "green");
    } else {
        $("#opponent_speed_iv").css("color", "gold");
    }

    $("#opponent_level").text(window.pokebot_encounter["level"]);
    $("#opponent_nature").text(window.pokebot_encounter["nature"]);
    $("#opponent_location").text(window.pokebot_encounter["metLocation"]);
    $("#opponent_item").text(window.pokebot_encounter["item"]["name"]);
    $("#opponent_item_image").attr(
        "src",
        "/interface/sprites/items/" + window.pokebot_encounter["item"]["name"] + ".png"
    );

    window.pokebot_encounter["type"] = window.pokebot_encounter["type"].filter((e) => e !== "Fairy");
    var types = "";
    types += get_type_image(window.pokebot_encounter["type"][0])
    if (window.pokebot_encounter["type"][1] != "") {
        types += get_type_image(window.pokebot_encounter["type"][1])
    }

    // Type
    $("#opponent_type").html(types);

    // Global Stats - Phase Encounters
    $("#opponent_phase_encounters").text(
        window.pokebot_stats["pokemon"][cleaned_pokemon_name]["phase_encounters"].toLocaleString()
    );

    window.pokebot_stats["pokemon"][cleaned_pokemon_name]["encounters"] = (window.pokebot_stats["pokemon"][cleaned_pokemon_name]["encounters"] === undefined) ? 0 : window.pokebot_stats["pokemon"][cleaned_pokemon_name]["encounters"];
    $("#opponent_encounters").text(
        window.pokebot_stats["pokemon"][cleaned_pokemon_name]["encounters"].toLocaleString()
    );

    window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_encounters"] = (window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_encounters"] === undefined) ? 0 : window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_encounters"];
    $("#opponent_shiny_encounters").text(
        window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_encounters"].toLocaleString()
    );

    window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_average"] = (window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_average"] === undefined) ? "-" : window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_average"];
    $("#opponent_shiny_average").text(
        window.pokebot_stats["pokemon"][cleaned_pokemon_name]["shiny_average"]
    );

    window.pokebot_stats["pokemon"][cleaned_pokemon_name]["phase_lowest_sv"] = (window.pokebot_stats["pokemon"][cleaned_pokemon_name]["phase_lowest_sv"] === undefined) ? 65535 : window.pokebot_stats["pokemon"][cleaned_pokemon_name]["phase_lowest_sv"];
    $("#opponent_phase_lowest_sv").text(
        window.pokebot_stats["pokemon"][cleaned_pokemon_name]["phase_lowest_sv"].toLocaleString()
    );

    if (window.pokebot_stats["pokemon"][cleaned_pokemon_name]["phase_lowest_sv"] < 8) {
        $("#opponent_phase_lowest_sv").css("color", "green");
    } else {
        $("#opponent_phase_lowest_sv").css("color", "red");
    }

    for (i of Array(4).keys()) {
        if (window.pokebot_encounter["moves"][i]["name"] != "None") {
            $("#opponent_move_" + i).text(
                window.pokebot_encounter["moves"][i]["name"]
            );
            $("#opponent_move_pp_" + i).text(
                window.pokebot_encounter["moves"][i]["remaining_pp"] + "/" + window.pokebot_encounter["moves"][i]["pp"]
            );
        } else {
            $("#opponent_move_" + i).text("-");
            $("#opponent_move_pp_" + i).text("-");
        }
    }
}

function update_dash_encounter_log_elements() {
    // Retrieves latest encounter log from the API and updates all the relevant details
    
    // Host tr to hold HTML
    var tr = "";

    // Loop through all pokemon, append date into HTML table
    for (var i = 0; i < 11; i++) {
        if (window.pokebot_encounter_log[i]["pokemon"]) {
            if (window.pokebot_encounter_log[i]["pokemon"]["shiny"]) {
                sprite_dir = "shiny/";
                sv_colour = "gold";

            } else {
                sprite_dir = "";
                sv_colour = "red";
            }

            tr +=
                '<tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                sprite_dir +
                window.pokebot_encounter_log[i]["pokemon"]["name"] + '.png"></td><td class="text-center">' +
                window.pokebot_encounter_log[i]["pokemon"]["name"] + '</td><td class="text-center">' +
                window.pokebot_encounter_log[i]["pokemon"]["level"] + '</td><td class="text-center">' +
                window.pokebot_encounter_log[i]["pokemon"]["nature"] + '</td><td class="text-center"><img title="' +
                window.pokebot_encounter_log[i]["pokemon"]["item"]["name"] + '" class="sprite16" src="/interface/sprites/items/' +
                window.pokebot_encounter_log[i]["pokemon"]["item"]["name"] + '.png"></td><td class="text-center"><code class="code">' +
                window.pokebot_encounter_log[i]["pokemon"]["pid"] + '</code></td><td class="text-center" style="color:' +
                sv_colour + ';">' +
                window.pokebot_encounter_log[i]["pokemon"]["shinyValue"].toLocaleString() +
                "</td></tr>";
        }
        document.getElementById("encounter_log").innerHTML = tr;
    }
}

function update_dash_shiny_log_elements() {
    // Retrieves the shiny log from the API and updates all the relevant details

    var tr = "";
    for (var i = 0; i < 25; i++) {
        if (window.pokebot_shiny_log[i]) {
            if (window.pokebot_shiny_log[i]["pokemon"]["shiny"]) {
                sprite_dir = "shiny/";
                sv_colour = "gold";
            } else {
                sprite_dir = "";
                sv_colour = "red";
            }
            tr +=
                '<tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                sprite_dir +
                window.pokebot_shiny_log[i]["pokemon"]["name"] +'.png"></td><td class="text-center">' +
                window.pokebot_shiny_log[i]["pokemon"]["name"] +'</td><td class="text-center">' +
                window.pokebot_shiny_log[i]["pokemon"]["level"] +'</td><td class="text-center">' +
                window.pokebot_shiny_log[i]["pokemon"]["nature"] +'</td><td class="text-center"><img title="' +
                window.pokebot_shiny_log[i]["pokemon"]["item"]["name"] + '" class="sprite16" src="/interface/sprites/items/' +
                window.pokebot_shiny_log[i]["pokemon"]["item"]["name"] + '.png"></td><td class="text-center"><code class="code">' +
                window.pokebot_shiny_log[i]["pokemon"]["pid"] + '</code></td><td class="text-center" style="color:' +
                sv_colour +
                ';">' +
                window.pokebot_shiny_log[i]["pokemon"]["shinyValue"].toLocaleString() +
                "</td></tr>";
        }
    }

    document.getElementById("shiny_log").innerHTML = tr;
}

function update_dash_stats_elements() {
    // Retrieves stats from the API and updates all the relevant details

    window.pokebot_stats["totals"]["phase_encounters"] = (window.pokebot_stats["totals"]["phase_encounters"] === undefined) ? 0 : window.pokebot_stats["totals"]["phase_encounters"];
    $("#stats_phase_encounters").text(
        window.pokebot_stats["totals"]["phase_encounters"].toLocaleString()
    );

    window.pokebot_stats["totals"]["shiny_encounters"] = (window.pokebot_stats["totals"]["shiny_encounters"] === undefined) ? 0 : window.pokebot_stats["totals"]["shiny_encounters"];
    $("#stats_shiny_encounters").text(
        window.pokebot_stats["totals"]["shiny_encounters"].toLocaleString()
    );

    window.pokebot_stats["totals"]["shiny_encounters"] = (window.pokebot_stats["totals"]["shiny_encounters"] === undefined) ? 0 : window.pokebot_stats["totals"]["shiny_encounters"];
    $("#stats_total_encounters").text(
        window.pokebot_stats["totals"]["encounters"].toLocaleString()
    );

    window.pokebot_stats["totals"]["shiny_average"] = (window.pokebot_stats["totals"]["shiny_average"] === undefined) ? "-" : window.pokebot_stats["totals"]["shiny_average"];
    $("#stats_shiny_average").text(
        window.pokebot_stats["totals"]["shiny_average"]
    );

    window.pokebot_stats["totals"]["shortest_phase_encounters"] = (window.pokebot_stats["totals"]["shortest_phase_encounters"] === undefined) ? 0 : window.pokebot_stats["totals"]["shortest_phase_encounters"];
    $("#stats_shortest_phase").text(
        window.pokebot_stats["totals"]["shortest_phase_encounters"].toLocaleString()
    );

    window.pokebot_stats["totals"]["longest_phase_encounters"] = (window.pokebot_stats["totals"]["longest_phase_encounters"] === undefined) ? 0 : window.pokebot_stats["totals"]["longest_phase_encounters"];
    $("#stats_longest_phase").text(
        window.pokebot_stats["totals"]["longest_phase_encounters"].toLocaleString()
    );
}


// Run regular updates on each function
window.setInterval(function () { update_dash_shiny_log_elements(); }, 2500);
window.setInterval(function () { update_dash_encounter_log_elements(); }, 2500);
window.setInterval(function () { update_dash_current_encounter_elements(); }, 250);
window.setInterval(function () { update_dash_trainer_elements(); }, 500);
window.setInterval(function () { update_dash_item_elements(); }, 5000);
window.setInterval(function () { update_dash_stats_elements(); }, 1000);
window.setInterval(function () { api_call_dash_html(); }, 1200);    // Updates all global vars from API