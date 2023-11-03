host = "http://localhost:8888";
host2 = "http://localhost:8889";
window.encounter = null;    // Host the encounter as a global variable
function trainer() {
    $.ajax({
        method: "GET",
        url: host + "/trainer",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 500,
    }).done(function(trainer) {
        $("#trainer_id").text(trainer["tid"]);
        $("#trainer_secret").text(trainer["sid"]);
        $("#trainer_map_bank_id").text(
            trainer["map"][0] + ":" + trainer["map"][1]
        );
        $("#trainer_coords").text(
            "X " + trainer["coords"][0] + ", Y " + trainer["coords"][1]
        );
        $("#trainer_state").text(trainer["facing"]);
    });
}

function items() {
    $.ajax({
        method: "GET",
        url: host + "/items",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 500,
    }).done(function(items) {
        let tr = ""

        let wrapper = document.getElementById("items_log")

        let condenseditems = []
        Object.entries(items).forEach(([key, value]) => {
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
                        value[keyItems]   +
                        "</td></tr>"           
            }
        })

        wrapper.innerHTML = tr
    })
}

function get_type_image(type_str) {
    return `<img src=\"/interface/sprites/types/${type_str}.png\">`;
}

function current_encounter() {
    
    // Update the Current encounter details
    $(".opponent_name").text(window.encounter["name"]);
    $("#health-bar-fill").css(
        "width",
        (window.encounter["stats"]["hp"] / window.encounter["stats"]["maxHP"]) * 100 + "%"
    );

    if (window.encounter["shiny"]) {
        $("#opponent_name").css("color", "gold");
        $("#opponent_shiny").text("Yes!");
        // If the pokemon hasn't changed, don't redraw the gif
        if ($("#opponent_personality").text() != window.encounter["pid"]){
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
        if ($("#opponent_personality").text() != window.encounter["pid"]){
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
    if (window.encounter["type"][1] != ""){
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

function encounter_log() {

    // Retrieve the last 10 encounters and append data into the HTML

    // Call on API for the encounter log
    $.ajax({
        method: "GET",
        url: host + "/encounter_log",
        crossDomain: true,

        dataType: "json",
        format: "json",
        timeout: 10000,
    }).done(function(encounter_log) {
        
        // Host tr to hold HTML
        var tr = "";

        // Reverse the log to show last encounter first
        reverse_encounter_log = encounter_log.reverse();  

        // Set the global variable for encounter so encounter function
        // can pick it up
        window.encounter = reverse_encounter_log[0]["pokemon"];
        
        for (var i = 0; i < 11; i++) {
            if (reverse_encounter_log[i]["pokemon"]) {
                if (reverse_encounter_log[i]["pokemon"]["shiny"]) {
                    sprite_dir = "shiny/";
                    sv_colour = "gold";
                    
                } else {
                    sprite_dir = "";
                    sv_colour = "red";   
                }

                tr +=
                    '<p id="encounter_log"><tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                    sprite_dir +
                    reverse_encounter_log[i]["pokemon"]["name"] + '.png"></td><td class="text-center">' +
                    reverse_encounter_log[i]["pokemon"]["name"] + '</td><td class="text-center">' +
                    reverse_encounter_log[i]["pokemon"]["level"] + '</td><td class="text-center">' +
                    reverse_encounter_log[i]["pokemon"]["nature"] + '</td><td class="text-center"><img title="' +
                    reverse_encounter_log[i]["pokemon"]["item"]["name"] + '" class="sprite16" src="/interface/sprites/items/' +
                    reverse_encounter_log[i]["pokemon"]["item"]["name"] + '.png"></td><td class="text-center"><code class="code">' +
                    reverse_encounter_log[i]["pokemon"]["pid"] + '</code></td><td class="text-center" style="color:' +
                    sv_colour +';">' +
                    reverse_encounter_log[i]["pokemon"]["shinyValue"].toLocaleString() +
                    "</td></tr></p>";
            }
            document.getElementById("encounter_log").innerHTML = tr;
        }
        
        // Fill in encounter data with the last mon
        // encounter(reverse_encounter_log[0]["pokemon"]);
        
    });
}

function api_call(tail) {

}

function shiny_log() {
    $.ajax({
        method: "GET",
        url: host + "/shiny_log",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 2500,
    }).done(function(shiny_log) {
        var tr = "";
        var wrapper = document.getElementById("shiny_log");

        reverse_shiny_log = shiny_log["shiny_log"].reverse();

        for (var i = 0; i < 25; i++) {
            if (reverse_shiny_log[i]) {
                if (reverse_shiny_log[i]["pokemon"]["shiny"]) {
                    sprite_dir = "shiny/";
                    sv_colour = "gold";
                } else {
                    sprite_dir = "";
                    sv_colour = "red";
                }
                tr +=
                    '<tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                    sprite_dir +
                    reverse_shiny_log[i]["pokemon"]["name"] +
                    '.png"></td><td class="text-center">' +
                    reverse_shiny_log[i]["pokemon"]["name"] +
                    '</td><td class="text-center">' +
                    reverse_shiny_log[i]["pokemon"]["level"] +
                    '</td><td class="text-center">' +
                    reverse_shiny_log[i]["pokemon"]["nature"] +
                    '</td><td class="text-center"><img title="' +
                    reverse_shiny_log[i]["pokemon"]["itemName"] +
                    '" class="sprite16" src="/interface/sprites/items/' +
                    reverse_shiny_log[i]["pokemon"]["itemName"] +
                    '.png"></td><td class="text-center"><code class="code">' +
                    reverse_shiny_log[i]["pokemon"]["personality"] +
                    '</code></td><td class="text-center" style="color:' +
                    sv_colour +
                    ';">' +
                    reverse_shiny_log[i]["pokemon"]["shinyValue"].toLocaleString() +
                    "</td></tr>";
            }
        }

        wrapper.innerHTML = tr;
    });
}

function stats() {
    $.ajax({
        method: "GET",
        url: host + "/stats",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 2500,
    }).done(function(stats) {
        stats["totals"]["phase_encounters"] = (stats["totals"]["phase_encounters"] === undefined) ? 0 : stats["totals"]["phase_encounters"];
        $("#stats_phase_encounters").text(
            stats["totals"]["phase_encounters"].toLocaleString()
        );

        stats["totals"]["shiny_encounters"] = (stats["totals"]["shiny_encounters"] === undefined) ? 0 : stats["totals"]["shiny_encounters"];
        $("#stats_shiny_encounters").text(
            stats["totals"]["shiny_encounters"].toLocaleString()
        );

        stats["totals"]["shiny_encounters"] = (stats["totals"]["shiny_encounters"] === undefined) ? 0 : stats["totals"]["shiny_encounters"];
        $("#stats_total_encounters").text(
            stats["totals"]["encounters"].toLocaleString()
        );

        stats["totals"]["shiny_average"] = (stats["totals"]["shiny_average"] === undefined) ? "-" : stats["totals"]["shiny_average"];
        $("#stats_shiny_average").text(
            stats["totals"]["shiny_average"]
        );

        stats["totals"]["shortest_phase_encounters"] = (stats["totals"]["shortest_phase_encounters"] === undefined) ? 0 : stats["totals"]["shortest_phase_encounters"];
        $("#stats_shortest_phase").text(
            stats["totals"]["shortest_phase_encounters"].toLocaleString()
        );

        stats["totals"]["longest_phase_encounters"] = (stats["totals"]["longest_phase_encounters"] === undefined) ? 0 : stats["totals"]["longest_phase_encounters"];
        $("#stats_longest_phase").text(
            stats["totals"]["longest_phase_encounters"].toLocaleString()
        );
    });
}


function emulator(){
    // emulator data pull from API
    $.ajax({
        method: "GET",
        url: host + "/emulator",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 2500,
    }).done(function(emulator) {
    
    });
}

window.setInterval(function() {
    shiny_log();
}, 2500);

window.setInterval(function() {
    encounter_log();
}, 2500);

window.setInterval(function() {
    current_encounter();
}, 250);

window.setInterval(function() {
    trainer();
}, 500);

window.setInterval(function() {
    stats();
}, 1000);

window.setInterval(function() {
    items();
}, 2500);

shiny_log();
encounter_log();
current_encounter();
trainer();
items();