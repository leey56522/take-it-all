document.querySelector('button').addEventListener('click', selectDeck);

// Select the deck to play by finding id
function selectDeck() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(resp => resp.json())
  .then(data => {
      // If local storage has deck, use it
      if(localStorage.getItem('deck')) {
        // Check if stored deck has cards left. Replace deck if no card left
        const deck = JSON.parse(localStorage.getItem('deck'))
        if(checkCardsLeft(deck.remaining)) {
          drawTwo(deck.deck_id);
        } else {
          localStorage.removeItem('deck');
          selectDeck()
        }
      // If no card left in stored deck, grab from API and store it in localstorage
      } else {
        let deck_id = data.deck_id;
        localStorage.setItem('deck', JSON.stringify(data))
        drawTwo(deck_id);
      }
    })
  .catch(error => console.log(`error! ${error}`))
}

// check if stored deck has cards left.
function checkCardsLeft(card_remaining) {
  if(card_remaining === 0) {
    return false
  } else {
    return true
  }
}

// Use the deck id to draw 2 random cards
function drawTwo(id) {
  fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => {
      document.getElementById('player1').src = data.cards[0].image
      document.getElementById('player2').src = data.cards[1].image
      decideResult(data.cards[0].value, data.cards[1].value)
    })
    .catch(error => console.log(`error! ${error}`))
}

// compare card values to determine winner of the round
function decideResult(player1_val, player2_val) {
  const processed_p1_val = processVal(player1_val);
  const processed_p2_val = processVal(player2_val);

  if (processed_p1_val > processed_p2_val) {
    document.getElementById('result').innerText = 'Player 1 wins!'
  } else if (processed_p2_val > processed_p1_val) {
    document.getElementById('result').innerText = 'Player 2 wins!'
  } else {
    document.getElementById('result').innerText = 'Draw!'
  }
}

// process card value into a number
function processVal(card_val) {
  if(isNaN(card_val)) {
    if(card_val === 'JACK') {
      return 11
    } else if (card_val === 'QUEEN') {
      return 12
    } else if (card_val === 'KING') {
      return 13
    } else {
      return 14
    }
  } else {
    return Number(card_val)
  }
}