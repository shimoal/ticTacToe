

var board = [[1, 2, 3],
						 [4, 5, 6],
						 [7, 8, 9]];
						 
						 

var winningCombos = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[2,5,8],
	[3,6,9],
	[1,5,9],
	[3,5,7]
];

function includesArray(twoDArray, checkingArray) {
 var thisArrIncludes = true;
 for (var index in twoDArray) {
 		var subArr = twoDArray[index];
 		thisArrIncludes = true;
 	for (var i = 0; i < subArr.length; i++){
 		if (subArr[i] !== checkingArray[i]) {
 			thisArrIncludes = false;
 		}
 	}
 	
 	if (thisArrIncludes === true) {
 		return true;
 	}
 	
 }
 
 return false;
}


var player1 = {
	name: "Player 1",
	mark: "X",
	moves: []
};
var player2 = {
	name: "Player 2",
	mark: "O",
	moves: []
};

function checkForWins(player){
	var wins = player.moves.sort(); //array of wins
	if (wins.length < 3){

		return false;
	} else {
		for (var i = 0; i < wins.length - 2; i++){
			for (var j = i + 1; j < wins.length - 1; j++){
				for (var k = j + 1; k < wins.length; k++){
					var combo = [wins[i], wins[j], wins[k]];

						if (includesArray(winningCombos, combo)) {
							return true;
						}
				}
			}
		}
	}

	return false;

}


var winner = undefined;

function gameWon(){
	if (checkForWins(player1)) {
		winner = player1;
		return true;
	} else if (checkForWins(player2)){
		winner = player2;

		return true;
	}

	return false;

}


var turn = 0;
var currentPlayer = player1;


function playGame(){
$("#current-player").html(currentPlayer.name);

	$(".space").on('click', function(){
				turn++;
				currentPlayer = (turn % 2 !== 0) ? player1 : player2;
				
				$(this).html("<p>"+currentPlayer.mark+"</p>");
				$(this).addClass("taken");
				(currentPlayer.moves).push(parseInt($(this).attr('id')));
			
			if (gameWon()) {
				alert("congratulations, "+ winner.name);
				newGame();
			} else {
				var displayName = (turn % 2 === 0) ? player1 : player2;
				$("#current-player").html(displayName.name);
			
			}
			
		});
}

function newGame(){
	player1 = {
		name: "Player 1",
		mark: "X",
		moves: []
	};

 player2 = {
		name: "Player 2",
		mark: "O",
		moves: []
	};
	
	$(".space").removeClass("taken");

	turn = 0;
	winner = undefined;
}


	
$(document).ready(function(){

			playGame();
			$("#new-game").on('click', function(){
				newGame();
				});

});


