var model = {
	boardSize: 7,
	//numShips: 3, 
	shipLength: 3,
	shipsSunk: 0,

	generateShipLocations: function() {
		this.ships = {}; // define attributes of model
		for (var i = 0; i < this.numShips; i++) {
			this.ships[i] = { locations: [0, 0, 0], hits: ["", "", ""] };
		}

		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	},

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			// here's an improvement! Check to see if the ship
			// has already been hit, message the user, and return true.
			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	}
}; 


var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayMissiles: function() {
		var missileArea = document.getElementById("missileLeft");
		missileArea.innerHTML = "Missiles: " + controller.missiles;
	},

	displayHit: function(location) {
		var cell = document.getElementById(location).parentNode;
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location).parentNode;
		cell.setAttribute("class", "miss");
	}
}; 

var controller = {
	guesses: 0,
	missiles: 30,

	processGuess: function(location) {
		if (location) {
			this.guesses++;
			this.missiles--;
			view.displayMissiles();
			var hit = model.fire(location);
			if (hit && model.shipsSunk == model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");

				// remove tables
				this.removeTable();
			}

			if (!this.missiles && model.shipsSunk != model.numShips) {
				view.displayMessage("Lose the game, no missiles!");

				// remove tables
				this.removeTable();
			}
		}
	},

	processNum: function(num) {
		var numOfBattleship = checkNum(num);
		if (numOfBattleship) { // if number is valid
			model.numShips = numOfBattleship;
			model.generateShipLocations();

			// delete form
			var myForm = document.getElementById("myForm");
			myForm.remove();

			// generate buttons
			this.generateButtons();

			// add button.onclick
			this.addOnclick();
		}
	},

	generateButtons: function() {
		for (var i = 0; i < model.boardSize; i++) {
			var table = document.getElementById("table");
			var row = document.createElement("tr");
			table.appendChild(row);
			for (var j = 0; j < model.boardSize; j++) {
				var tableData = document.createElement("td");
				row.appendChild(tableData);
				var button = document.createElement("input");
				tableData.appendChild(button);
				button.setAttribute("type", "button");
				button.setAttribute("class", "fireButton");
				button.setAttribute("id", String(i) + String(j));
			}
		}
	},
	 
	addOnclick: function() {
		// after generate buttons, handle them
		for (var i = 0; i < model.boardSize; i++) {
			for (var j = 0; j < model.boardSize; j++) {
				var id = String(i) + String(j);
				var button = document.getElementById(id);
				button.onclick = handleFireButton;
			}
		}
	},

	removeTable: function() {
		var table = document.getElementById("table");
		table.remove();
	}
}


// helper function to parse a guess from the user

function checkNum(num) {
	if (num == null || isNaN(num)) {
		alert("Oops, please enter a number on the board.");
	} else if (num <= 0 || num > 5) {
		alert("Oops, please enter a number between 1 and 5.");
	} else {
		return num;
	}
	return null;
}


// event handlers

function handleCommitButton() {
	var numInput = document.getElementById("battleshipNum");
	var num = numInput.value;

	controller.processNum(num);

	if (numInput) {
		numInput.value = "";
	}
}

function handleKeyPress(e) {
	var commitButton = document.getElementById("commitButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		commitButton.click();
		return false;
	}
}

function handleFireButton(eventObj) {
	var button = eventObj.target;
	var location = button.id;
	controller.processGuess(location);
}

function addMusic() {
	var board = document.getElementById("board");
	var audio = document.createElement(audio);
	board.appendChild(audio);
	audio.setAttribute('src', "music/001.mp3");
	audio.setAttribute('autoplay', 'autoplay');
}


// init - called when the page has completed loading

window.onload = init;

function init() {
	// Commit button onclick handler
	var commitButton = document.getElementById("commitButton");
	commitButton.onclick = handleCommitButton;

	// handle "return" key press
	var numInput = document.getElementById("battleshipNum");
	numInput.onkeypress = handleKeyPress;

	audioAutoPlay();

	view.displayMissiles();
}
