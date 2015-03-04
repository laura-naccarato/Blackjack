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

	blackjack.randomNumber = function(number){
		randomNumber = Math.floor(Math.random() * number) +0;
		return randomNumber;
	}

	blackjack.drawCard = function(x){
	//choose random deck	
		// console.log("x",x);
		var deck = blackjack.randomNumber(cards.length);
		var card = blackjack.randomNumber(cards[deck].length);
		card++	
		if (deck === 0)	{
			deck = "spades";
		} else if (deck === 1){
			deck = "hearts";
		} else if (deck === 2){
			deck = "diamonds"
		} else if(deck === 3){
			deck = "clubs";
		}
		x.push(card + " of " + deck);
		blackjack.tempNumber = card;
	}

	blackjack.playerInitialDeal = function(){	
		for (var i = 0; i < 2; i++)	{
			blackjack.drawCard(blackjack.hand);
			blackjack.playerScore = blackjack.playerScore + blackjack.tempNumber;	
		}

		console.log("your cards are ", blackjack.hand);
		console.log("Player score is ", blackjack.playerScore);
	}
	blackjack.dealerInitialDeal = function(){
			for (var i = 0; i < 2; i++)	{
			blackjack.drawCard(blackjack.dealerHand);
			blackjack.dealerScore = blackjack.dealerScore + blackjack.tempNumber;	
		}

		// console.log("dealer cards are ",blackjack.dealerHand);
		// console.log("your current dealer score is ", blackjack.dealerScore);
		
	}
	blackjack.hitMe = function(){
		$(".hitme").on("click", function(){
			console.log("clicked");
			blackjack.drawCard(blackjack.hand);
			console.log(blackjack.tempNumber);
			blackjack.playerScore = blackjack.playerScore + blackjack.tempNumber;	
			console.log("your current score is ", blackjack.playerScore);
			blackjack.overUnder(blackjack.playerScore, blackjack.twentyOne)
		});
	}
	blackjack.overUnder = function (x, y) {
		if (x > y) {
			console.log("You have gone over 21! Your cards add up to " + blackjack.playerScore);
		} 
	}
	blackjack.reset = function(){
		$(".reset").on("click", function(){
		console.log("reset clicked")	
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
		})
	}
	blackjack.gameInit = function(){
	blackjack.playerInitialDeal();
	blackjack.dealerInitialDeal();
		
	}
	init = function(){
	blackjack.gameInit();
	blackjack.hitMe();
	blackjack.reset();
	}
