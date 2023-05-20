let score, scoreBank, playingCards, playerCurrentCard, deck;
let playersOpenCards = [];
let openСards = [];

class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

class Deck {

  constructor(cardsData) {

    this.suits = cardsData.suits;
    this.ranks = cardsData.ranks;
    this.values = cardsData.values;

  }

  shuffleDeck() {

    this.cards = this.suits.map(suit =>
      this.ranks.map((rank, i) =>
        new Card(suit, this.ranks[i], this.values[i])))
      .flat()
      .sort(() => Math.random() - 0.5);

    return this.cards;
  }

}

function countScores(cardsArray) {
  return cardsArray.reduce(
    (accumulator, currentCard) => accumulator + currentCard.value, 0);
}

function getDeckData() {

  let request = new XMLHttpRequest();
  request.open('GET', 'blackJack/current.json');
  request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  request.send();
  request.addEventListener('load', () => {
    if (request.status === 200) {
      let dataCard = JSON.parse(request.response);
      deck = new Deck(dataCard);
      deck.shuffleDeck();
      return;
    }
    
      let bug = document.querySelector('#coloda');
      bug.innerHTML = `<div>ошибка<br>данных</div>`;
      bug.style.color = "white";
      document.querySelector('#result').innerHTML = 'ошибка';

  });

}

function startGame() {

  getDeckData();
  document.getElementById("btn1").disabled = false;
  document.getElementById("btn2").disabled = false;
  document.querySelector('#btn1').innerHTML = 'взять';
  document.querySelector('#btn2').innerHTML = 'пас';
  playersOpenCards.length = 0;
  openСards.length = 0;
  score = 0;
  scoreBank = 0;
  document.querySelector('#result').innerHTML = 'идёт игра';
  document.querySelector('#pl').innerHTML = '';
  document.querySelector('#bank').innerHTML = '';
  document.querySelector('#score').innerHTML = '';
  document.querySelector('#scoreBank').innerHTML = '';

}

function bankir() {

  openСards.push(deck.cards[0]);
  scoreBank = countScores(openСards);
  deck.cards.shift(scoreBank);
  templateUpdates.bankirStart();

  if (scoreBank > 21) {

    showСards();

    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    templateUpdates.bankirBust();
    return;

  }

  if (scoreBank > 14 && scoreBank <= 21) {

    templateUpdates.bankirStop();

  }
}

function launchBankir() {

  if (scoreBank < 15) {

    bankir();
    launchBankir();

  }
}

function takeCardBankir() {

  if (scoreBank < 15 && score <= 21) {

    bankir();

  }

}

function takeCard() {

  playerCurrentCard = deck.cards[0];
  playersOpenCards.push(deck.cards[0]);
  score = countScores(playersOpenCards);
  deck.cards.shift();
  templateUpdates.takeStart();

  if (score > 21) {

    showСards();
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    templateUpdates.takeBust();
    takeCardBankir();
    return;
  }

  if (score === 21) {

    pass();
    templateUpdates.takeVictory();
    takeCardBankir();
    return;

  }

  templateUpdates.takeShortfall();
  takeCardBankir();

}

function pass() {

  document.querySelector('#score').innerHTML = `пас ${score}`;
  document.getElementById("btn1").disabled = true;
  document.getElementById("btn2").disabled = true;

  launchBankir();

  showСards();

  if (score > scoreBank || scoreBank > 21) {

    document.querySelector('#result').innerHTML = 'вы выиграли';
    playingCards.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
    return;
  }

  if (score < scoreBank) {

    document.querySelector('#result').innerHTML = 'вы проиграли';
    playingCards.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
    return;

  }

  document.querySelector('#result').innerHTML = 'ничья';
  playingCards.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';

}

function showСards() {

  if (scoreBank > 21) {

    document.querySelector('#scoreBank').innerHTML = `перебор ${scoreBank}`;

    templateUpdates.openBankCards();

    return;

  }

  document.querySelector('#scoreBank').innerHTML = scoreBank;

  templateUpdates.openBankCards();

}

let templateUpdates = {

  takeStart() {
    let divCard = document.querySelector('#pl');
    playingCards = document.createElement('div');
    playingCards.classList.add("coloda");
    playingCards.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
    playingCards.innerHTML = `<div>${playerCurrentCard.rank}<br>${playerCurrentCard.suit}</div>`;
    divCard.append(playingCards);
  },

  takeVictory() {
    document.querySelector('#score').innerHTML = score;
  },

  takeShortfall() {
    document.querySelector('#score').innerHTML = score;
  },

  takeBust() {
    document.querySelector('#score').innerHTML = `перебор ${score}`;
    document.querySelector('#result').innerHTML = 'вы проиграли';
  },

  bankirStart() {
    let divCard = document.querySelector('#bank');
    playingCards = document.createElement('div');

    playingCards.classList.add("coloda");

    playingCards.style.background = 'radial-gradient(#000 0%, #7B1672 100%)';

    divCard.append(playingCards);
  },

  bankirBust() {
    document.querySelector('#scoreBank').innerHTML = `перебор ${scoreBank}`;
    document.querySelector('#result').innerHTML = 'вы выиграли';
    document.querySelector('#score').innerHTML = score;
  },

  bankirStop() {
    document.querySelector('#scoreBank').innerHTML = `пас`;
  },

  openBankCards() {
    let divCard = document.querySelector('#bank');
    divCard.innerHTML = '';
    openСards.forEach((card) => {
      playingCards = document.createElement('div');
      playingCards.classList.add("coloda");
      playingCards.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
      playingCards.innerHTML = `<div>${card.rank}<br>${card.suit}</div>`;
      divCard.append(playingCards);
    });
  }

};


