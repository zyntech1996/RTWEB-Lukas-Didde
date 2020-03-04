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

$(document).ready( function() {    
    let playerName = prompt('Please player, enter you name:','Andrea666');

	// initial state of the game
	let state = {hp: 100, xp: 0, score: 0};
	
	let gameIsRunning = true;
	
	// the display that will show what happens
	$('#status').html( 'Initial status: ' + JSON.stringify(state) );	
	
	function quit(){
		$('#status').html( 'You logged out! ' +
							'HighScore: ...' + state.score );
		gameIsRunning = false;
		enterBtn.disabled = true;
        
        $.getJSON( "./highscores.json", function( data ) {
            console.log( 'the result:' , data);
            $('#status').append('<br>'+JSON.stringify(data));
            
            let scoreObj = data.filter( (element)=> element.username == playerName);
            let scoreValue = 0;
            if (scoreObj.length>=1){
                scoreValue = scoreObj[0].bestScore;
            }            
            console.log( scoreObj , scoreObj.length , scoreValue);
            if (state.score > scoreValue){
                alert(`Congratulations you just surpassed your previous highscore!
\n
old = ${scoreValue} ; new = ${state.score}`
);
            }
        })
	}
	
	//$('#enterBtn').on('click', function(){
	$('#enterBtn').click( ()=>{
		let text = `Player ${playerName}: your status is now ${JSON.stringify(state)}`;
		
		switch( $('#userInput').val().toUpperCase() ){
			case 'QUIT':{
				quit();
				return;
			} break;
			case 'SEARCH':{
				let dice = Math.floor(Math.random()*6)+1;
				if (dice<=3){
					text += '<br/>you found something...';
					dice = Math.floor(Math.random()*6)+1;
					if (dice==1){
						text += '<br/>... a rosted chicken!';
						state.hp += Math.floor(Math.random()*6)+1;
					}
					if (dice==2){
						text += '<br/>... some coins!';
						state.score += Math.floor(Math.random()*6)+1;
						state.xp += Math.floor(Math.random()*6)+1;
					}
					if (dice==3){
						text += '<br/>... poisonous mushroom!';
						state.hp -= Math.floor(Math.random()*6)+1;
						state.xp += 1;
					}
				} else {
					text += '<br/>you found nothing.';
				}
			} break;
			case 'KILL':{
				let dice = Math.floor(Math.random()*6)+1;
				if (dice<=2){
					text += '<br/>you killed a monster!';
					state.hp -= Math.floor(Math.random()*6)+1;
					state.xp += Math.floor(Math.random()*6)+1;
					state.score += Math.floor(Math.random()*2);
				} else {
					text += '<br/>you tried to kill a monster... no luck!';
				}
			} break;
			default: {
				text += '<br/>...command not recognized...';
			}
		}
		$('#status').html( text );
	});
	
});
