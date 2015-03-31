$(function() {
init();
});
	var cards = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], //spades
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], //hearts
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10], //clubs
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10] //diamonds
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
		// array.push({card: card, deck:deck});
		blackjack.tempNumber = card;

	}
	blackjack.printCard = function (hand, i, location){
		if (hand[i].red === true){
			suite = $("<p class = cardSuiteRed>").text(blackjack.hand[i].deck);
			card = $("<p class = 'playingCardNumberRed'>").text(hand[i].card);
			card2 = $("<p class = 'playingCardNumberRed'>").text(hand[i].card);
			playingCard = $("<p class = 'playingCard'>").append(card, suite, card2);
			$(location).append(playingCard);
		} else {
			suite = $("<p class = cardSuiteBlack>").text(blackjack.hand[i].deck)
			card = $("<p class = 'playingCardNumberBlack'>").text(hand[i].card);
			card2 = $("<p class = 'playingCardNumberBlack'>").text(hand[i].card);
			playingCard = $("<p class = 'playingCard'>").append(card, suite, card2);

			$(location).append(playingCard);
		}
	}
	blackjack.playerInitialDeal = function(){	
		for (var i = 0; i < 2; i++)	{
			blackjack.drawCard(blackjack.hand);
			blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
			blackjack.printCard(blackjack.hand, i, ".playerHand");
		}
		blackjack.scoreBoard();
		console.log("your cards are ", blackjack.hand);
		console.log("Player score is ", blackjack.playerScore);
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
			console.log("clicked");
			blackjack.drawCard(blackjack.hand);
			console.log(blackjack.tempNumber);
			blackjack.playerScore = blackjack.addToScore(blackjack.playerScore);
			console.log("your current score is ", blackjack.playerScore);
			blackjack.overUnder(blackjack.playerScore, blackjack.twentyOne)
			blackjack.scoreBoard();
		});
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
			console.log("You have gone over 21! Your cards add up to " + blackjack.playerScore);
			blackjack.reset();
		} else if (x === y) {
			console.log("you win!");
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
	blackjack.gameInit();
	blackjack.fold();
	blackjack.hitMe();
	blackjack.resetButton();
	}
