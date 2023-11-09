/*
* Pokedex JS-----------------------------------------------------------------------------
* 
* Version: 0.1
* Copyright, 30SomethingProgrammer
* Licensed under MIT
* -----------------------------------------------------------------------------
* The above notice must be included in its entirety when this file is used.
* This script is a modified version from https://github.com/40Cakes/pokebot-bizhawk
*/


function update_pokedex_elements() {
  var table_body = document.querySelector("#pokedex");

  // Sort by dex number
  window.pokebot_pokedex.sort((a, b) => {
    var numberA = a.pokedex_id;
    var numberB = b.pokedex_id;
    return numberA - numberB;
  });
  // Step into each dex entry, apply formatting to page to show each pokemon
  window.pokebot_pokedex.forEach(function (pokemon) {

    // Clear up the pokemon name by replacing chars that don't work nicely with other markups
    var cleaned_pokemon_name = pokemon.name
    .replaceAll("'", "")
    .replaceAll("♀", "_F")
    .replaceAll("♂", "_M");

    // Create a new row
    var row = document.createElement("tr");

    // Cell - Pokedex number
    var pokedex_id_cell = document.createElement("td");
    pokedex_id_cell.textContent = pokemon.pokedex_id;

    // Cell - Pokemon image
    var img_cell = document.createElement("td");
    var pokemon_image = document.createElement("img");
    img_cell.appendChild(pokemon_image);
    pokemon_image.src = "/interface/sprites/pokemon/" + cleaned_pokemon_name + ".png";
    pokemon_image.width = "50";
    row.setAttribute("data-pokemon", cleaned_pokemon_name);

    // Cell - Pokemon Name
    var name_cell = document.createElement("td");
    name_cell.textContent = pokemon.name;

    // Cell - Pokemon capture locations
    var location_cell = document.createElement("td");
    let pokemon_location_strings = pokemon.encounters.map((i) => i.location);
    row.setAttribute("data-locations", JSON.stringify(pokemon_location_strings));
    if (pokemon.encounters.length > 0) {
      var grouped_encounters = {};

      pokemon.encounters.forEach((encounter) => {
        if (grouped_encounters[encounter.location]) {

          // If encounter location exists in grouped_encounters, append encounter details
          grouped_encounters[encounter.location].push(encounter);
        } else {

          // Otherwise, create a new entry in grouped_encounters
          grouped_encounters[encounter.location] = [encounter];
        }
      });

      // Iterate over grouped encounters and create elements
      Object.keys(grouped_encounters).forEach((location) => {
        var encounters = grouped_encounters[location];
        // Create pillbadge for each location it can be found on
        var div = document.createElement("div");
        var pill = document.createElement("span");
        pill.classList.add("badge");
        pill.classList.add("badge-pill");
        pill.style.margin = "0.5em";
        pill.textContent = location;
        pill.setAttribute("data-toggle", "dropdown");

        // Dropdown solution
        div.classList.add("dropdown");
        div.classList.add("with-arrow");
        div.classList.add("toggle-on-hover");
        var dropdown = document.createElement("div");
        dropdown.classList.add("dropdown-menu");
        dropdown.style.padding = "0";

        // Create a table for the dropdown
        const table = document.createElement("table");
        const headerRow = document.createElement("tr");
        const methodHeader = document.createElement("th");
        methodHeader.textContent = "Method";
        headerRow.appendChild(methodHeader);
        const levelsHeader = document.createElement("th");
        levelsHeader.textContent = "Levels";
        headerRow.appendChild(levelsHeader);
        const rateHeader = document.createElement("th");
        rateHeader.textContent = "Rate";
        headerRow.appendChild(rateHeader);
        table.appendChild(headerRow);
        table.style.marginLeft = "1em";
        table.style.marginRight = "1em";
        table.style.tableLayout = "auto";

        // Set values for each encounter
        encounters.forEach((encounter) => {
          const valuesRow = document.createElement("tr");
          const methodCell = document.createElement("td");
          methodCell.style.whiteSpace = "nowrap";
          methodCell.textContent = get_encounter_type(encounter.encounter_type);
          const levelsCell = document.createElement("td");
          levelsCell.style.whiteSpace = "nowrap";
          levelsCell.textContent = encounter.levels;
          const rateCell = document.createElement("td");
          rateCell.style.whiteSpace = "nowrap";
          rateCell.textContent = encounter.rate;
          valuesRow.appendChild(methodCell);
          valuesRow.appendChild(levelsCell);
          valuesRow.appendChild(rateCell);
          table.appendChild(valuesRow);
        });

        dropdown.appendChild(table);
        div.appendChild(pill);
        div.appendChild(dropdown);
        location_cell.appendChild(div);
      });
    } else {
      location_cell.textContent = "";
    }

    // Cell - Pokemon capture status
    var catch_pokemon = document.createElement("td");
    var catch_pokemon_btn = document.createElement("button");
    var catch_image = "/interface/sprites/items/Poké Ball.png";
    var no_catch_image = "/interface/sprites/items/Poké Ball-disabled.png";
    var catch_pokemon_image = document.createElement("img");
    catch_pokemon_image.classList.add("pokeball-sprite");
    catch_pokemon_image.setAttribute("pokemon-name", pokemon.name);

    // Check if pokemon is on the no-catch list, if so, disable the pokeball
    if (window.pokebot_blocked["block_list"].includes(pokemon.name)) {
      catch_pokemon_image.src = no_catch_image;
    } else if (!window.pokebot_blocked["block_list"].includes(pokemon.name)) {
      catch_pokemon_image.src = catch_image;
    }

    catch_pokemon_btn.appendChild(catch_pokemon_image);
    catch_pokemon_btn.style.all = "unset";

    catch_pokemon_btn.onclick = function () {
      // Switch sprite depending on currently selected
      catch_pokemon_image.src.includes("-disabled")
        ? (catch_pokemon_image.src = catch_image)
        : (catch_pokemon_image.src = no_catch_image);
      // Pass pkmname and current sprite to bot
      var data = {
        pokemonName: pokemon.name,
        spriteLoaded: catch_pokemon_image.src,
      };

      // Send post req to flask with the data
      $.ajax({
        method: "POST",
        url: window.pokebot_host2 + "/updateblocklist",
        crossDomain: true,
        contentType: "application/json",
        format: "json",
        data: JSON.stringify(data),
        timeout: 500,
      });
    };
    //if pokemon has encounters, show the button, otherwise don't
    if (pokemon.encounters.length > 0) {
      catch_pokemon.appendChild(catch_pokemon_btn);
    }

    // append the cells to the row
    row.appendChild(pokedex_id_cell);
    row.appendChild(img_cell);
    row.appendChild(name_cell);
    row.appendChild(location_cell);
    row.appendChild(catch_pokemon);

    //add the row to the table #pokedex
    table_body.appendChild(row);
  });
}

// Format the encounter types
function get_encounter_type(method) {
  switch (method) {
    case "walking":
      return "Walking";
    case "walk":
      return "Walking";
    case "fishing_old":
      return "Old Rod";
    case "fishing_good":
      return "Good Rod";
    case "fishing_super":
      return "Super Rod";
    case "special":
      return "Special Encounter";
    case "deepsand":
      return "Deep Sand";
    case "rocksmash":
      return "Rock Smash";
    case "surfing":
      return "Surfing";
    case "surf":
      return "Surfing";
    case "grass":
      return "Grass";
    case "swarm":
      return "Swarm";
    case "trade":
      return "Trade";
    case "gift":
      return "Gift";
    case "roam":
      return "Roaming";
    case "underwater":
      return "Dive Underwater";
    case "wailmerpail":
      return "Wailmer Pail";
    case "hidden":
      return "Hidden";
    case "starter":
      return "Starter";
  }
}

// Check the block list, show a gray pokeball if blocked
function check_block_list() {
  var pokeballs = document.getElementsByClassName("pokeball-sprite");
  for (var i = 0; i < pokeballs.length; i++) {
    var pokemonName = pokeballs[i].getAttribute("pokemon-name");
    if (window.pokebot_blocked["block_list"].includes(pokemonName)) {
      pokeballs[i].src = "/interface/sprites/items/Poké Ball-disabled.png";
    } else {
      pokeballs[i].src = "/interface/sprites/items/Poké Ball.png";
    }
  }
}

// logic for search bar filtering on route/pokemon name
function pokedex_filter() {
  let searchStr = document
    .getElementById("searchBar")
    .value.toLocaleLowerCase();
  const table = document.getElementById("pokedex");

  // filter table rows on data-pokemon or data-locations if either contain searchStr
  for (let row of table.children) {
    let pkmName = row.getAttribute("data-pokemon");
    let locations = row.getAttribute("data-locations");
    if (
      !pkmName.toLocaleLowerCase().includes(searchStr) &&
      !locations.toLocaleLowerCase().includes(searchStr)
    ) {
      row.style.display = "none";
    } else {
      row.style.display = "";
    }
  }
}

// Call on API and update the window variables
api_call_pokedex_html(); 

// Update the entries on the page with a minor delay to afford api call to finalise
setTimeout(function(){
  update_pokedex_elements();
}, 1000);

// Set intervals to update the vars
window.setInterval(function () {
  check_block_list();
}, 1000);
