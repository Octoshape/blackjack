const hit = document.getElementById('hit');
const stand = document.getElementById('stand');
const double = document.getElementById('double');
const myLabel = document.getElementById('myLabel');
const bankLabel = document.getElementById('bankLabel');
const result = document.getElementById('result');
const reset = document.getElementById('reset');
const single_suit = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const DECKS = 8;
let myCards = [];
let myScore = 0;
let bankCards = [];
let bankScore = 0;
let deck = [];

let getValue = function(card) {
	switch(card) {
		case 'A':
			return 1;
		case '2':
			return 2;
		case '3':
			return 3;
		case '4':
			return 4;
		case '5':
			return 5;
		case '6':
			return 6;
		case '7':
			return 7;
		case '8':
			return 8;
		case '9':
			return 9;
		case '10':
		case 'J':
		case 'Q':
		case 'K':
			return 10;
		default:
			return -1;
	}
}

function updateScores() {
	myScore = getScore(myCards, false);
	myLabel.textContent = getScore(myCards, true);

	bankScore = getScore(bankCards, false);
	bankLabel.textContent = getScore(bankCards, true);
}

function disableButtons() {
	hit.disabled = true;
	stand.disabled = true;
}

function enableButtons() {
	hit.disabled = false;
	stand.disabled = false;
}

let getScore = function(cards, string) {
	let totalValue = 0;
	let stringValue = "";
	let aces = 0;
	cards.forEach(function(card) {
		let value = getValue(card);
		if (value == 1) {
			aces++;
		}
		totalValue += value;
	});
	if (aces > 0 && totalValue < 12) {
		stringValue = totalValue + ' / ' + (totalValue + 10);
	} else {
		stringValue = totalValue;
	}
	if (string) {
		return '(' + stringValue + ') ' + cards.join(', ');
	} else {
		return (aces > 0 && totalValue < 12) ? totalValue + 10 : totalValue;
	}
}

Array.prototype.shuffle = function() {
	var i = this.length, j, temp;
	if ( i == 0 ) return this;
	while ( --i ) {
	   j = Math.floor( Math.random() * ( i + 1 ) );
	   temp = this[i];
	   this[i] = this[j];
	   this[j] = temp;
	}
	return this;
  }

hit.onclick = function() {
	result.textContent = "";
	myCards.push(deck.pop());
	updateScores();
	if (myScore > 21) {
		result.textContent = "Busted!";
		disableButtons();
	}
};


stand.onclick = function() {
	disableButtons();
	while (bankScore < 17) {
		bankCards.push(deck.pop());
		updateScores();
	}

	if (bankScore > 21) {
		result.textContent = "Dealer busted!";
	} else if (bankScore > myScore) {
		result.textContent = "You lose!";
	} else if (bankScore == myScore) {
		result.textContent = "Push!";
	} else {
		result.textContent = "You win!";
	}
};

// double.onclick = function() {
// 	myCards.push('A');
// 	updateScores();
// };

reset.onclick = function() {
	if (deck.length <= Math.floor(DECKS * 52 * 0.2)) {
		result.textContent += " New shuffle!";
		deck = new Array(DECKS * 4).fill(single_suit);
		deck = deck.join().split(",");
		deck.shuffle();
	}
	myCards = [];
	bankCards = [];
	myCards.push(deck.pop());
	myCards.push(deck.pop());
	bankCards.push(deck.pop());
	updateScores();
	enableButtons();
	result.textContent = "";
};

reset.onclick();