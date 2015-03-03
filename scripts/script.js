$(function() {
	var cards = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
	];
	var blackjack = {};
	blackjack.hand = {};
	console.log(cards[2].length);

	blackjack.randomNumber = function(number){
	randomNumber = Math.floor(Math.random() * number) +1;
	return randomNumber;
	}

	blackjack.drawCard = function(){
	//choose random deck	
	var deck = blackjack.randomNumber(cards.length);

	var card = blackjack.randomNumber(cards[deck].length);	

	blackjack.hand += deck: deck;

	console.log(blackjack.hand);
	}

	blackjack.initialDeal = function(){	
	console.log("your cards are " )	
	}
	blackjack.drawCard();
});