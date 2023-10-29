// host = window.location.protocol + "//" + window.location.host
host = "http://localhost:8888";
host2 = "http://localhost:8889";
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
            "X " + trainer["coords"][0] + ", Y " + trainer["map"][1]
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

function encounter() {
    $.ajax({
        method: "GET",
        url: host2 + "/encounter",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 1000,
    }).done(function(encounter) {
        $(".opponent_name").text(encounter["name"]);
        $("#health-bar-fill").css(
            "width",
            (encounter["stats"]["hp"] / encounter["stats"]["maxHP"]) * 100 + "%"
        );

        if (encounter["shiny"]) {
            $("#opponent_name").css("color", "gold");
            $("#opponent_shiny").text("Yes!");
            $("#opponent_sprite").attr(
                "src",
                "/interface/sprites/pokemon/shiny/" + encounter["name"] + ".png"
            );
            $("#opponent_shiny").css("color", "gold");
            $("#opponent_shiny_value").css("color", "gold");
        } else {
            $("#opponent_shiny").text("No");
            $("#opponent_sprite").attr(
                "src",
                "/interface/sprites/pokemon/" + encounter["name"] + ".png"
            );
            $("#opponent_shiny").css("color", "red");
            $("#opponent_shiny_value").css("color", "red");
            $("#opponent_name").css("color", "");
        }
        $("#opponent_shiny_value").text(
            encounter["shinyValue"].toLocaleString()
        );
        $("#opponent_hidden_power_type").html(
            get_type_image(encounter["hiddenPower"])
        );
        $("#opponent_personality").text(encounter["nature"]);
        $("#opponent_hp").text(encounter["stats"]["hp"].toLocaleString());
        $("#opponent_hp_iv").text(encounter["IVs"]["hp"]);
        $("#opponent_attack").text(encounter["stats"]["attack"].toLocaleString());
        $("#opponent_attack_iv").text(encounter["IVs"]["attack"]);
        $("#opponent_defense").text(encounter["stats"]["defense"].toLocaleString());
        $("#opponent_defense_iv").text(encounter["IVs"]["defense"]);
        $("#opponent_spattack").text(encounter["stats"]["spAttack"].toLocaleString());
        $("#opponent_spattack_iv").text(encounter["stats"]["IVs"]["spAttack"]);
        $("#opponent_spdef").text(encounter["stats"]["spDefense"].toLocaleString());
        $("#opponent_spdef_iv").text(encounter["IVs"]["spDefense"]);
        $("#opponent_speed").text(encounter["stats"]["speed"].toLocaleString());
        $("#opponent_speed_iv").text(encounter["IVs"]["speed"]);

        if (encounter["IVs"]["hp"] <= 15) {
            $("#opponent_hp_iv").css("color", "red");
        } else if (encounter["IVs"]["hp"] <= 30) {
            $("#opponent_hp_iv").css("color", "green");
        } else {
            $("#opponent_hp_iv").css("color", "gold");
        }
        if (encounter["IVs"]["attack"] <= 15) {
            $("#opponent_attack_iv").css("color", "red");
        } else if (encounter["IVs"]["attack"] <= 30) {
            $("#opponent_attack_iv").css("color", "green");
        } else {
            $("#opponent_attack_iv").css("color", "gold");
        }
        if (encounter["IVs"]["defense"] <= 15) {
            $("#opponent_defense_iv").css("color", "red");
        } else if (encounter["IVs"]["defense"] <= 30) {
            $("#opponent_defense_iv").css("color", "green");
        } else {
            $("#opponent_defense_iv").css("color", "gold");
        }
        if (encounter["IVs"]["spAttack"] <= 15) {
            $("#opponent_spattack_iv").css("color", "red");
        } else if (encounter["IVs"]["spAttack"] <= 30) {
            $("#opponent_spattack_iv").css("color", "green");
        } else {
            $("#opponent_spattack_iv").css("color", "gold");
        }
        if (encounter["IVs"]["spDefense"] <= 15) {
            $("#opponent_spdef_iv").css("color", "red");
        } else if (encounter["IVs"]["spDefense"] <= 30) {
            $("#opponent_spdef_iv").css("color", "green");
        } else {
            $("#opponent_spdef_iv").css("color", "gold");
        }
        if (encounter["IVs"]["speed"] <= 15) {
            $("#opponent_speed_iv").css("color", "red");
        } else if (encounter["IVs"]["speed"] <= 30) {
            $("#opponent_speed_iv").css("color", "green");
        } else {
            $("#opponent_speed_iv").css("color", "gold");
        }

        $("#opponent_level").text(encounter["level"]);
        $("#opponent_nature").text(encounter["nature"]);
        $("#opponent_location").text(encounter["metLocation"]);
        $("#opponent_items").text(encounter["item"]);
        $("#opponent_item_image").attr(
            "src",
            "/interface/sprites/items/" + encounter["item"] + ".png"
        );

        encounter["type"][0] = encounter["type"][0].filter((e) => e !== "Fairy");
        var types = "";
        var arrayLength = encounter["type"][0].length;
        for (var o = 0; o < arrayLength; o++) {
            types +=
                get_type_image(encounter["type"][0][o]) +
                String(encounter["type"][0][o] != 0 && arrayLength != 1 ? "" : " ");
        }

        $("#opponent_type").html(types);

        encounter["stats"]["phase_encounters"] = (encounter["stats"]["phase_encounters"] === undefined) ? 0 : encounter["stats"]["phase_encounters"];
        $("#opponent_phase_encounters").text(
            encounter["stats"]["phase_encounters"].toLocaleString()
        );

        encounter["stats"]["encounters"] = (encounter["stats"]["encounters"] === undefined) ? 0 : encounter["stats"]["encounters"];
        $("#opponent_encounters").text(
            encounter["stats"]["encounters"].toLocaleString()
        );

        encounter["stats"]["shiny_encounters"] = (encounter["stats"]["shiny_encounters"] === undefined) ? 0 : encounter["stats"]["shiny_encounters"];
        $("#opponent_shiny_encounters").text(
            encounter["stats"]["shiny_encounters"].toLocaleString()
        );

        encounter["stats"]["shiny_average"] = (encounter["stats"]["shiny_average"] === undefined) ? "-" : encounter["stats"]["shiny_average"];
        $("#opponent_shiny_average").text(
            encounter["stats"]["shiny_average"]
        );

        encounter["stats"]["phase_lowest_sv"] = (encounter["stats"]["phase_lowest_sv"] === undefined) ? 65535 : encounter["stats"]["phase_lowest_sv"];
        $("#opponent_phase_lowest_sv").text(
            encounter["stats"]["phase_lowest_sv"].toLocaleString()
        );

        if (encounter["stats"]["phase_lowest_sv"] < 8) {
            $("#opponent_phase_lowest_sv").css("color", "green");
        } else {
            $("#opponent_phase_lowest_sv").css("color", "red");
        }

        for (i of Array(4).keys()) {
            if (encounter["moves"][i]) {
                $("#opponent_move_" + i).text(
                    encounter["enrichedMoves"][i]["name"]
                );
                $("#opponent_move_pp_" + i).text(
                    encounter["pp"][i] + "/" + encounter["enrichedMoves"][i]["pp"]
                );
            } else {
                $("#opponent_move_" + i).text("-");
                $("#opponent_move_pp_" + i).text("-");
            }
        }
    });
}

function encounter_log() {
    $.ajax({
        method: "GET",
        url: host + "/encounter_log",
        crossDomain: true,
        dataType: "json",
        format: "json",
        timeout: 2500,
    }).done(function(encounter_log) {
        var tr = "";

        reverse_encounter_log = encounter_log[0].reverse();

        for (var i = 0; i < 25; i++) {
            if (reverse_encounter_log[i]) {
                if (reverse_encounter_log[i]["pokemon"]["shiny"]) {
                    sprite_dir = "shiny/";
                    sv_colour = "gold";
                } else {
                    sprite_dir = "";
                    sv_colour = "red";
                }

                tr +=
                    '<tr><td><img class="sprite32" src="/interface/sprites/pokemon/' +
                    sprite_dir +
                    reverse_encounter_log[i]["pokemon"]["name"] +
                    '.png"></td><td class="text-center">' +
                    reverse_encounter_log[i]["pokemon"]["name"] +
                    '</td><td class="text-center">' +
                    reverse_encounter_log[i]["pokemon"]["level"] +
                    '</td><td class="text-center">' +
                    reverse_encounter_log[i]["pokemon"]["nature"] +
                    '</td><td class="text-center"><img title="' +
                    reverse_encounter_log[i]["pokemon"]["itemName"] +
                    '" class="sprite16" src="/interface/sprites/items/' +
                    reverse_encounter_log[i]["pokemon"]["itemName"] +
                    '.png"></td><td class="text-center"><code class="code">' +
                    reverse_encounter_log[i]["pokemon"]["personality"] +
                    '</code></td><td class="text-center" style="color:' +
                    sv_colour +
                    ';">' +
                    reverse_encounter_log[i]["pokemon"][
                        "shinyValue"
                    ].toLocaleString() +
                    "</td></tr>";
            }
        }

        wrapper.innerHTML = tr;
    });
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

window.setInterval(function() {
    shiny_log();
}, 2500);

window.setInterval(function() {
    encounter_log();
}, 2500);

window.setInterval(function() {
    encounter();
}, 1000);

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
trainer();
encounter();
items();