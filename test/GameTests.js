import {expect} from 'chai';
import {gameService} from '../function/GamesService.js'

describe("gameService Tests", function() {

    describe("getGames()", function() {
        // Test: Should return a successful response with a list of games
        // 1. Verify the response status is 200.
        // 2. Ensure the data is an array with a length of 3.
        // 3. Check that the first game includes the required keys: 'id', 'title', 'genre', 'year', 'developer', 'description'.
    
        it('returns response 200 with list of 3 games', function(){
            const response = gameService.getGames();

            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array').that.has.lengthOf(3);
            expect(response.data[0]).to.have.all.keys('id', 'title', 'genre', 'year', 'developer', 'description');
            expect(response.data[1]).to.have.all.keys('id', 'title', 'genre', 'year', 'developer', 'description');
            expect(response.data[2]).to.have.all.keys('id', 'title', 'genre', 'year', 'developer', 'description');
        });
    });
  
    describe("addGame()", function() {
        // Test: Should add a new game successfully
        // 1. Create a valid new game object.
        // 2. Verify the response status is 201 and the success message is correct.
        // 3. Check that the newly added game appears in the game list.
  
        // Test: Should return an error for invalid game data
        // 1. Create an invalid game object (missing required fields).
        // 2. Check that the response status is 400 and the error message is "Invalid Game Data!".
        it('should add a new game successfully', function(){
            const newGame = {
                id: '4',
                title: "testGame1",
                genre: 'mmorpg',
                year: 2020,
                developer: "ubisoft",
                description: "mmorpg game"
            }

            const response = gameService.addGame(newGame);

            expect(response.status).to.equal(201);
            expect(response.message).to.equal('Game added successfully.');

            const allGames = gameService.getGames();
            expect(allGames.data).to.deep.include(newGame);
        });

        it('Should return an error for invalid game data', function(){
            const newGame = {
                id: '4',
                developer: "ubisoft",
                description: "mmorpg game"
            }

            const response = gameService.addGame(newGame);
            expect(response.status).to.equal(400);
            expect(response.error).to.equal('Invalid Game Data!')

        });
    });
  
    describe("deleteGame()", function() {
        // Test: Should delete an existing game by ID
        // 1. Delete a game by its ID.
        // 2. Verify the response status is 200 and the success message is correct.
        // 3. Ensure the game is successfully removed from the list.
  
        // Test: Should return an error if the game is not found
        // 1. Attempt to delete a game with a non-existent ID.
        // 2. Check that the response status is 404 and the error message is "Game Not Found!".
        it('Should delete an existing game by ID', function(){

            const gameIDtoDelete = '3';
            const response = gameService.deleteGame(gameIDtoDelete);

            expect(response.status).to.equal(200);
            expect(response.message).to.equal('Game deleted successfully.');

            const gamesLeft = gameService.getGames().data;
            const foundGame = gamesLeft.filter(game => game.id === gameIDtoDelete);
            expect(foundGame.length).to.equal(0);
        });

        it('Should return an error if the game is not found', function(){

            const gameIDtoDelete = '10';
            const response = gameService.deleteGame(gameIDtoDelete);

            expect(response.status).to.equal(404);
            expect(response.error).to.equal('Game Not Found!');
        });
    });
  
    describe("updateGame()", function() {
        // Test: Should update an existing game with new data
        // 1. Create updated game data and update an existing game by its ID.
        // 2. Verify the response status is 200 and the success message is correct.
        // 3. Ensure the updated game is reflected in the game list.
  
        // Test: Should return an error if the game to update is not found
        // 1. Attempt to update a game that doesn't exist.
        // 2. Check that the response status is 404 and the error message is "Game Not Found!".
  
        // Test: Should return an error if the new game data is invalid
        // 1. Provide incomplete or invalid data for an existing game.
        // 2. Check that the response status is 400 and the error message is "Invalid Game Data!".
        it('Should update an existing game with new data', function(){
            const oldId = '2';
            const newGame = {
                id: oldId,
                title: "testGame2",
                genre: 'mmorpg',
                year: 2021,
                developer: "ubisoft2",
                description: "mmorpg game"
            }

            const response = gameService.updateGame(oldId,newGame);
            expect(response.status).to.equal(200);
            expect(response.message).to.equal('Game updated successfully.');
            const allgames = gameService.getGames().data;
            expect(allgames).to.deep.include(newGame);
        });

        it('Should return an error if the game to update is not found', function(){
            const oldId = '2331';
            const newGame = {
                id: oldId,
                title: "testGame2",
                genre: 'mmorpg',
                year: 2021,
                developer: "ubisoft2",
                description: "mmorpg game"
            }

            const response = gameService.updateGame(oldId,newGame);
            expect(response.status).to.equal(404);
            expect(response.error).to.equal('Game Not Found!');
        });

        it('Should return an error if the new game data is invalid', function(){
            const oldId = '2';
            const newGame = {
                title: "testGame2",
                genre: 'mmorpg',
                year: 2021,
                developer: "ubisoft2",
                description: "mmorpg game"
            }

            const response = gameService.updateGame(oldId,newGame);
            expect(response.status).to.equal(400);
            expect(response.error).to.equal('Invalid Game Data!');
        });
    });
  });