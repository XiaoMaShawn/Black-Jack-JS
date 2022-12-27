let dealerSum = 0;
let yourSum = 0;

//how many ace card u have, A could be 1 or 10
let dealerAceCount = 0;
let yourAceCount = 0;

//hidden card and all cards deck
let hidden;
let deck;

//allow the player to draw while yourSum <= 21
let canHit = true;

window.onload = function() {
  buildDeck();
  shuffleDeck();
  startGame();
}

function buildDeck() {
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const types = ['C', 'D', 'H', 'S'];
  deck = [];
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + '-' + types[i]);
    }
  }
  // console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  // console.log(deck);
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  while (dealerSum < 17) {
    //create <img>
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = './cards/' + card + '.png';
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    //append the cardImg in the dealer-cards div or it will not be shown in the screen
    // console.log(cardImg);
    document.getElementById('dealer-cards').append(cardImg);
  }
  // console.log(hidden);
  // console.log(dealerSum);
  // console.log(dealerAceCount);
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = './cards/' + card + '.png';
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById('your-cards').append(cardImg);
  }
  // console.log(yourSum);
  // console.log(yourAceCount);
  document.getElementById('hit').addEventListener('click', hit);
}

function getValue(card) {
  let data = card.split('-');// '4-C' -> ['4','C']
  let value = data[0];
  if (isNaN(value)) { // 'A' 'J' 'Q' 'K'
    if (value == 'A') {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == 'A') { // card is a string 'A-C'
    return 1;
  }
  return 0;
}

function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement('img');
  let card = deck.pop();
  cardImg.src = './cards/' + card + '.png';
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById('your-cards').append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {//check 'A' and change it from 11 to 1
    canHit = false;
  }
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}