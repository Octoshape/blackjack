const hit = document.getElementById('hit');
const stand = document.getElementById('stand');
const double = document.getElementById('double');
const myScore = document.getElementById('myScore');
const bankScore = document.getElementById('bankScore');
const result = document.getElementById('result');
const reset = document.getElementById('reset');
let deck = [];
const DECKS = 4;

let getValue = function(card) {
	switch(card) {
		case 'A':
			return 0;
		case '2':
			return 0;
			case '2':
				return 0;
				case '2':
					return 0;
					case '2':
						return 0;
	}
}

let getCard = function() {
	return 1;
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
	myScore.textContent = parseInt(myScore.textContent, 10) + Math.floor(Math.random() * 9) + 2;
	if (myScore.textContent > 21) {
		reset.onclick();
	}
};

const single_deck = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

stand.onclick = function() {
	let bank = parseInt(bankScore.textContent, 10);
	while (bank < 17) {
		bank += Math.floor(Math.random() * 10) + 2;
	}
	bankScore.textContent = bank;

	player = parseInt(myScore.textContent, 10);

	if (bank > 21) {
		result.textContent = "Dealer busted!";
	} else if (bank > player) {
		result.textContent = "You lose!";
	} else if (bank == player) {
		result.textContent = "Push!";
	} else {
		result.textContent = "You win!";
	}
};

double.onclick = function() {
};

reset.onclick = function() {
	console.log("reset");
	result.textContent = "";
	bankScore.textContent = Math.floor(Math.random() * 9) + 2;
	myScore.textContent = Math.floor(Math.random() * 9) + 2;
	if (deck.length <= Math.floor(DECKS * 13 * 0.2)) {
		result.textContent = "New shuffle!";
		deck = new Array(DECKS).fill(single_deck);
		deck = deck.join().split(",");
		deck.shuffle();
	}
};

reset.onclick();