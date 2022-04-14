# take-it-all
<a href="https://ibb.co/Zx1fWss"><img src="https://i.ibb.co/1TJ08VV/Screen-Shot-2022-04-14-at-3-22-01-PM.png" alt="Screen-Shot-2022-04-14-at-3-22-01-PM" border="0" width="300"></a>

- This is a simple card game made with Deck of Cards API
- Each player draws a random card from a deck
- The player with a card with bigger value wins for the round
- Play until no cards are left in the deck

## Challenges I encountered
- Not all cards had numeric values. I had to convert jack, queen, king, and ace into 11, 12, 13, 14 respectively to compare them with numeric cards
- Figuring out how to check if all the cards are used
- Storing deck in cache so that the game does not start with a new deck when the browser reloads

## Upcoming changes
- Determine the final winner by counting how many rounds each player won by the time all cards are played
- Style the game
