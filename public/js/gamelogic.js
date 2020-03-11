//Notes for PF assignment
//Different attack styles, each attack style damage depends on the target
//More enemies with different attributes. Weakness (e.g. crush, slash or stab), HP, damage and exp for a kill. 
//Room definition which includes: roomname, items (Keys, doors etc), 1-2 different enemies (1 enemy each room, diversity), distance (using tree format) - Json format
//Change player state to a json format including: HP, EXP, Damage, lvl and inventory. 
//Chat system firstly just single player communication.
//Maybe implement bootstrap for structure
//Login system using json as database
//Use module export for http instead of server.

//Json example
/*
{
	"first_room": {
		"name": "Candy Kingdom",
		"desc": "The First Room",
		"roomid": 1,
		"npcnumber": 1
	}
}
*/
var value2 = [];
let playerName = "";
let state = {
	username: "",
	hp: 100,
	xp: 0,
	score: 0
};

$(document).ready(function () {

	let uslocal = localStorage.getItem('Username');
	var bool = false;
	//let playerName = prompt('Please enter character name: ');
	//$('#localSBtn').click(function () {
	
	
function asyncGetName(callback){
	//setTimeout(function(){
		if (localStorage.getItem('Username') == null) {
			console.log('No Item In LocalStorage!');
			localStorage.clear();
		}else {
			$.getJSON("/highscores.json", function (data) {
				//console.log(data)
				Object.keys(data).forEach(function (key) {
	
					let value = data[key];
					if (value["username"] == uslocal) {
						bool = true;
						console.log(bool, value.character);
						//value2.push(value);
						//return value2;
						playerName += value.character;
						console.log("playerName ", playerName);
						callback(playerName)
	
					}
					
				})
				
			})
		}
		
		//callback(playerName);
	//}, Math.random() * 2000)
	

	};
	/*
	// 1. Call helloCatAsync passing a callback function,
	//    which will be called receiving the result from the async operation
	console.log("1. function called...")
	helloCatAsync(function (result) {
		// 5. Received the result from the async function,
		//    now do whatever you want with it:
		console.log("5. result is: ", result);
	});

	// 2. The "callback" parameter is a reference to the function which
	//    was passed as argument from the helloCatAsync call
	function helloCatAsync(callback) {
		console.log("2. callback here is the function passed as argument above...")
		// 3. Start async operation:
		setTimeout(function () {
			console.log("3. start async operation...")
			console.log("4. finished async operation, calling the callback, passing the result...")
			// 4. Finished async operation,
			//    call the callback passing the result as argument
			callback('Nya');
		}, Math.random() * 2000);
	}*/

	//function getName()

	asyncGetName(function (results) {
		console.log("result is: ", results)
		playerName = results;
		state.username += playerName;
		$('#status').html('Initial status: ' + JSON.stringify(state));
		console.log(playerName);

	});
	//console.log(playerName);
		//console.log("value: " + value);
	//console.log("Value 2 array: " + value2);


	$('#localBtn').click(function () {
		$.post('/highscores.json', function (data) {

			//JSON.parse(data);
			//console.log(data);
		});

	});
	$('#logout').click(function () {
		localStorage.clear();
	})




	//console.log(func());
	//console.log(func());
	//console.log(getName());
	//playerName += state.username;

	let gameIsRunning = true;

	// the display that will show what happens
	

	function quit() {
		$('#status').html('You logged out! ' +
			'HighScore: ...' + state.score);
		gameIsRunning = false;
		enterBtn.disabled = true;

		$.getJSON("highscores.json", function (data) {
			console.log('the result:', data);
			$('#status').append('<br>' + JSON.stringify(data));

			let scoreObj = data.filter((element) => element.username == playerName);
			let scoreValue = 0;
			if (scoreObj.length >= 1) {
				scoreValue = scoreObj[0].bestScore;
			}
			console.log(scoreObj, scoreObj.length, scoreValue);
			if (state.score > scoreValue) {
				alert(`Congratulations you just surpassed your previous highscore!
\n
old = ${scoreValue} ; new = ${state.score}`);
			}
		})
	}

	//$('#enterBtn').on('click', function(){
	$('#enterBtn').click(() => {
		let text = `Player ${playerName}: your status is now ${JSON.stringify(state)}`;

		switch ($('#userInput').val().toUpperCase()) {
			case 'QUIT': {
				quit();
				return;
			}
			break;
		case 'SEARCH': {
			let dice = Math.floor(Math.random() * 6) + 1;
			if (dice <= 3) {
				text += '<br/>you found something...';
				dice = Math.floor(Math.random() * 6) + 1;
				if (dice == 1) {
					text += '<br/>... a rosted chicken!';
					state.hp += Math.floor(Math.random() * 6) + 1;
				}
				if (dice == 2) {
					text += '<br/>... some coins!';
					state.score += Math.floor(Math.random() * 6) + 1;
					state.xp += Math.floor(Math.random() * 6) + 1;
				}
				if (dice == 3) {
					text += '<br/>... poisonous mushroom!';
					state.hp -= Math.floor(Math.random() * 6) + 1;
					state.xp += 1;
				}
			} else {
				text += '<br/>you found nothing.';
			}
		}
		break;
		case 'KILL': {
			let dice = Math.floor(Math.random() * 6) + 1;
			if (dice <= 2) {
				text += '<br/>you killed a monster!';
				state.hp -= Math.floor(Math.random() * 6) + 1;
				state.xp += Math.floor(Math.random() * 6) + 1;
				state.score += Math.floor(Math.random() * 2);
			} else {
				text += '<br/>you tried to kill a monster... no luck!';
			}
		}
		break;
		default: {
			text += '<br/>...command not recognized...';
		}
		}
		$('#status').html(text);
	});

});