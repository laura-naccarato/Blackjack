$(function() {
init();
});
	var cards = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10], //spades
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10], //hearts
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10], //clubs
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10] //diamonds
	];
	var blackjack = {};
	blackjack.hand = [];
	blackjack.dealerHand = [];
	blackjack.playerScore = 0;
	blackjack.dealerScore = 0;
	blackjack.tempNumber = 0;
	blackjack.twentyOne = 21;
	blackjack.scoreTemp = 0;

	blackjack.randomNumber = function(number){
		randomNumber = Math.floor(Math.random() * number) +0;
		return randomNumber;
	}
	blackjack.start = function() {
		$(".start").on("click", function(e){

			e.preventDefault();
			$(".startScreen").html("");
			$(".activeGameSpace").toggleClass("hide");
		});
	}
	blackjack.addToScore = function(score){
		score = score + blackjack.tempNumber;
		return score;
	}
	blackjack.scoreBoard = function(){
		$(".playerScore").html("");
		$(".playerScore").append(blackjack.playerScore);
	}
	blackjack.drawCard = function(array){
		var deck = blackjack.randomNumber(cards.length);
		var tempCard = blackjack.randomNumber((cards[deck].length-1));
		var card = cards[deck][tempCard];
		console.log(card);
		if (deck === 0)	{
			deck = "♠";
			array.push({card: card, deck:deck, red:false});
		} else if (deck === 1){
			deck = "♥";
			array.push({card: card, deck:deck, red:true});
		} else if (deck === 2){
			deck = "♦"
			array.push({card: card, deck:deck, red:true});
		} else if(deck === 3){
			deck = "♣";
			array.push({card: card, deck:deck, red:false});
		}

		blackjack.tempNumber = card;

	}
	blackjack.printCard = function (hand, i, location){
		if (hand[i].red === true){
			var suite = $("<p class = cardSuiteRed>").text(blackjack.hand[i].deck);
			var card = $("<p class = 'playingCardNumberRed'>").text(hand[i].card);
			var card2 = $("<p class = 'playingCardNumberRed'>").text(hand[i].card);
			var playingCard = $("<p class = 'playingCard'>").append(card, suite, card2);
			$(location).append(playingCard);
		} else {
			var suite = $("<p class = cardSuiteBlack>").text(blackjack.hand[i].deck)
			var card = $("<p class = 'playingCardNumberBlack'>").text(hand[i].card);
			var card2 = $("<p class = 'playingCardNumberBlack'>").text(hand[i].card);
			var playingCard = $("<p class = 'playingCard'>").append(card, suite, card2);

			$(location).append(playingCard);
		}
	}
	// blackjack.convertLetters = function(i){
	// 	if (blackjack.hand[i].card === "J" || blackjack.hand[i].card === "Q" || blackjack.hand[i].card=== "K"){
	// 		blackjack.hand[i].card = 10;
	// 		blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
	// 	} else if (blackjack.hand[i].card === "A") {
	// 		blackjack.hand[i].card = 1;
	// 		blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
	// 	} else {
	// 		blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
	// 	}
	// }
	blackjack.playerInitialDeal = function(){	
		for (var i = 0; i < 2; i++)	{
			blackjack.drawCard(blackjack.hand);
			blackjack.printCard(blackjack.hand, i, ".playerHand");
			blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
		}
			blackjack.scoreBoard();
		
	}
	blackjack.dealerInitialDeal = function(){
			var suite = "";
			var cardValue= "";	
			for (var i = 0; i < 2; i++)	{
			blackjack.drawCard(blackjack.dealerHand);
			blackjack.dealerScore = blackjack.addToScore(blackjack.dealerScore);

		}
	}
	blackjack.hitMe = function(){
		$(".hitme").on("click", function(){
			blackjack.drawCard(blackjack.hand);
			blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
			blackjack.overUnder(blackjack.playerScore, blackjack.twentyOne)
			blackjack.scoreBoard();
		});
	}
	blackjack.toggleResult = function (){
		$(".gameResultPage").html("")
		$(".gameResultPage").toggleClass("hide");
		$(".activeGameSpace").toggleClass("hide");
	}
	blackjack.dealerPlay = function(){
		//as per Blackjack rules, the dealer draws cards until he reaches 17 or greater
		while (blackjack.dealerScore <= 17){
			blackjack.drawCard(blackjack.dealerHand);
			blackjack.dealerScore = blackjack.addToScore(blackjack.dealerScore);
		}
		console.log(blackjack.dealerScore);
	}
	//x referring to the score of either the dealer or player, y being 21
	blackjack.overUnder = function (x, y) {
		if (x > y) {
			blackjack.toggleResult();
			var h2 = $("<h2 class='resultText'>").text("You lose!");
			var p = $("<p class='resultText'>").text("You went over 21!");
			var a = $("<a href='#' class = 'resetResult resultText'>").text("Try Again?");
			$(".gameResultPage").append(h2, p, a);
		} else if (x === y) {
			blackjack.toggleResult();
			var h2 = $("<h2 class='resultText'>").text("You Win!");
			var p = $("<p class='resultText'>").text("Your cards add up to 21! Wow, you must feel like a real winner!");
			var a = $("<a href='#' class = 'resetResult resultText'>").text("Try Again?");
			$(".gameResultPage").append(h2, p, a);

		} else {
			blackjack.printCard(blackjack.hand, (blackjack.hand.length -1), ".playerHand");
		}
	}
	blackjack.reset = function (){
		$(".playerHand").text("");
		cards = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], //spades
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], //hearts
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], //clubs
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10] //diamonds
		];
		blackjack.hand = [];
		blackjack.dealerHand = [];
		blackjack.playerScore = 0;
		blackjack.dealerScore = 0;
		blackjack.tempNumber = 0;
		blackjack.twentyOne = 21;	
		blackjack.gameInit();
	}
	blackjack.resetButton = function(){
		$(".reset").on("click", function(){
		blackjack.reset();
	
		})
	}
	blackjack.resetButtonResult = function(){
		$("body").on("click", ".resetResult", function(){
		blackjack.reset();
		blackjack.toggleResult();
	
		})
	}
	blackjack.fold = function(){
		$(".fold").on("click", function(){
			blackjack.dealerPlay();
			blackjack.winnerCalculation();	
		});
	}
	blackjack.winnerCalculation = function() {
		if (blackjack.dealerScore > blackjack.playerScore && blackjack.dealerScore <=21 ){
			console.log("dealer wins! score: " + blackjack.dealerScore);	
		}	else {
			console.log("You Win! score: " + blackjack.playerScore);
		}
	}

	blackjack.gameInit = function(){
	blackjack.playerInitialDeal();
	blackjack.dealerInitialDeal();
	}
	init = function(){
	blackjack.start();
	blackjack.gameInit();
	blackjack.fold();
	blackjack.hitMe();
	blackjack.resetButton();
	blackjack.resetButtonResult();
	}
