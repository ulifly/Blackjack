**#Blackjack Casino**

this is a classic blackjack game following the official casino rules
i use a real casino dealer advisor for the accurate approach to the oficial rules

i made this in vanilla Js with a node server and socket.io for the real time com

the game is already functional and can be played, but need more rules implementations listed bellow 

##work in progress 

###Rules
[x] hide players not playing?
[X] add bet system
[ ] add a button to double down, the player can double the bet and take only one card  this first
[ ] add a message when deck is running out of cards and a new deck is created
[ ] button to split, the player can split the hand if the two cards are the same value, the player can play two hands
[ ] add a button to surrender, the player can surrender and get half of the bet back
[ ] offer insurance when dealer has an ace as first card, insurance is half the bet, if the dealer has blackjack the player gets 2:1


###Views
[ ] change the buttons to nicer ones canvas png
[ ] add chips to the game
[ ] add a background image to the game (blackjack felt)
[ ] change winner, lose, tie, blackjack message for a nicer ones
[ ] add flip card animations and sounds (canvas tween)

###Server
[ ] create button and logic to logout from server
[ ] add multiplayer functionality (3 players to the table)
[ ] when on play the new player should be able to see the game in progress but not to play until the game is over
[ ] check for player reconnection and continue the game(game session - game state)
[ ] TODO add a chat to the game
