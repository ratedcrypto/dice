# Casino Game Code Challenge
You have been provided with a simple dice game app exposed through a graphql api. The app uses cryptographic hashes to generate randomized outcomes to ensure the results are not rigged to favour the casino.

## The Challenge
1. Fix the Dice tests:
The dice game uses a secret, salted with an incrementing nonce to generate the result of each game. It is important that no nonces are duplicated or skipped. Our tests for this are not passing. Find a solution.

2. Add a New Game:
We want to add a new game where the player spins a wheel divided into segments. Each segment has a number that the player's wager will be multiplied by. 
Add this game to the codebase, with the appropriate game queries / mutations.

It should 
use the same cryptographic hash approach for generating random numbers
include unit tests
have a new type in graphql


3. Add support for multiple games to the statistics service.


### Extra notes for you
error handling is not existent
there is no user handling / balances etc
no input validation
fix duplicate nonce
fix issue with seed being requested multiple times