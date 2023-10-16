console.log("it works from soccer");

let tableBody = document.querySelector("tbody");
let playerSelectElement = document.querySelector("#player-select");
function displayInnerHTML(playerArray) {
  let htmlString = "";
  for (let i = 0; i < playerArray.length; i++) {
    htmlString += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${playerArray[i].firstName}</td>
        <td>${playerArray[i].lastName}</td>
        <td>${playerArray[i].position}</td>
        <td>${playerArray[i].team}</td>
        <td>${playerArray[i].jerseyNumber}</td>
      </tr>`;
  }

  tableBody.innerHTML = htmlString;
}

function populatePlayerDropDown(playerArray) {
  playerSelectElement.innerHTML = "";
  let htmlString = "";
  for (let i = 0; i < playerArray.length; i++) {
    htmlString += `<option value="${i + 10}">${playerArray[i].firstName} ${
      playerArray[i].lastName
    }
    </option>`;
  }
  playerSelectElement.innerHTML = htmlString;
}

function displayPlayers(playerArray) {
  // Clear out the INNERHTML of the tbody
  tableBody.innerHTML = "";
  for (let i = 0; i < playerArray.length; i++) {
    // Create <tr> tag
    let tableRow = document.createElement("tr");
    //  Create a function that will take my tr tag and players info to create the <td> and append them to the <tr> tag.
    tableBody.appendChild(tableRow);
    // Building out the tables
    tableDataBuilder(tableRow, i + 1);
    tableDataBuilder(tableRow, playerArray[i].firstName);
    tableDataBuilder(tableRow, playerArray[i].lastName);
    tableDataBuilder(tableRow, playerArray[i].position);
    tableDataBuilder(tableRow, playerArray[i].team);
    tableDataBuilder(tableRow, playerArray[i].jerseyNumber);
  }
}

function tableDataBuilder(tableRow, playerDataToDisplay) {
  // Create a TD tag
  let tableData = document.createElement("td");
  // Change the textContent of the TD to the playerDataToDisplay
  tableData.textContent = playerDataToDisplay;
  // append the TD tag to the tableRow
  tableRow.appendChild(tableData);
}

async function getallPlayers() {
  let url = "http://localhost:4000/player/view-all";
  try {
    let response = await fetch(url);
    let data = await response.json();
    // displayInnerHTML(data.player);
    displayPlayers(data.player);
    populatePlayerDropDown(data.player);
  } catch (error) {
    console.error(error);
  }
}

getallPlayers();

let soccerPlayerForm = document.querySelector("form");
soccerPlayerForm.addEventListener("submit", submitNewPlayer);

async function submitNewPlayer(e) {
  e.preventDefault();
  try {
    let formData = new FormData(e.target);
    let json = JSON.stringify(Object.fromEntries(formData));
    // 1. Create the url for the fetch (this should match postman)
    let url = "http://localhost:4000/player/add";
    // 2. Create Headers Object and append Content-Type
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // 3. Create a request Options Object and supply your body, method, and headers
    let requestOptions = {
      method: "POST",
      body: json,
      headers: myHeaders,
    };
    // 4. Conduct the fetch with request options.
    await fetch(url, requestOptions);
    // const data = await response.json();
    // If the fetch is successful refresh the table
    getallPlayers();
    // 5. Clear the form values
    soccerPlayerForm.reset();
  } catch (error) {
    console.error(error);
  }
}

let removePlayerForm = document.querySelector("#remove-player-form");
removePlayerForm.addEventListener("submit", submitForRemoval);

async function submitForRemoval(e) {
  e.preventDefault();
  try {
    //  1. Get the value of the current selection
    let playerIndex = playerSelectElement.value;
    // 2. Build our URL out where we can delete
    let url = "http://localhost:4000/player/delete/" + playerIndex;
    // 3. Create Request Options
    let requestOptions = {
      method: "DELETE",
    };
    // 4. Conduct the fetch
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data);
    // 5. If successful then we need to re-populate the table & the dropdown list
    getallPlayers();
  } catch (error) {
    console.error(error);
  }
}
