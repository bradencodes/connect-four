# Connect 4

*made by Braden Walker*

[Play the Game](https://connect-1234.netlify.com/)

This app matches users anonymously for a game of Connect 4. Written using React.js, LESS, Express, Socket.io, and MongoDB. You can play against other random people on any device. Enjoy and have fun!

## Implementation

### Client

#### Home Component
The home screen is responsible for creating or verifying a created user. Since users are anonymous, the user's random id is stored on the localStorage of his browser. The home component makes a call to the server to get all of the user's info, and stores that info on   the shared app state. It will then check and redirect the user to his last game if it is not finished.

#### Matching Component
This component will first check that the user is validated, and will send them to the home screen if not. Then it connects the user through socket.io to the lobby where it will wait for another player. Once a match is found, it will take the user out of the lobby and direct her to the newly created game.

#### Gameplay
Each board is made of 7 column components that are connected to socket.io for instant game updates. If it's not the player's turn, none of the columns will react to any of that player's input. If it is the players turn, only the columns with room for a token will react to player input. When a player clicks on a valid column, the column will tell the server who moved in which column for what game. The server will update the game and return the updated game to both players instantly.


### Server

#### Database Mongoose Models

##### User Model

```javascript
const UserSchema = new mongoose.Schema({
    //the games that a user has been a part of
    games: [{ type: ObjectId, ref: 'Game' }]
});
```

##### Game Model

```javascript
const GameSchema = new mongoose.Schema({
    //store what player has what color and who's turn it is
    black: { type: ObjectId, ref: 'User' },
    red: { type: ObjectId, ref: 'User' },
    turn: String,
    winner: { type: String, default: "none" },

    //a representation of the game board split into columns
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: [],
    col7: [],
});

//before creating a new game, randomly decide who starts
GameSchema.pre('save', function(next) {
    const randNum = Math.random();
    this.turn = randNum < 0.5 ? "black" : "red";
    return next();
});
```

#### Express Endpoints

##### User Endpoints

**Create a User**

**input**: none

**output**: the new user object

`.post('/user')`

**Find a User**

**input**: the _id of the user

**output**: the user matching the _id

`.get('/user/:_id')`

##### Game Endpoints

**Create a Game**

**input**: the _id of 2 players through req.body

**output**: the new game object

`.post('/game')`

**Find a Game**

**input**: the _id of the game

**output**: the matching game object

`.get('/game/:_id')`


#### Socket<span>.i</span>o Events

##### Matching Events

**joinLobby** (adds player to lobby)

**input**: the user joining the lobby

**output**: none

`io(/matching).emit('joinLobby', <user>)`

**leave** (removes player from lobby)

**input**: none

**output**: none

`io(/matching).emit('leave')`

##### Game Events

**join room** (have the socket join a room)

**input**: the name of the room

**output**: none

`io(/game).emit('join room', <room>)`

**update** (update a game)

**input**: the moving player's id, the id of their current game, the column they placed a token into

**output**: the updated game

`io(/game).emit('update', <player_id>, <game_id>, <column>)`

**resign** (end game by assigning winner)

**input**: token color of winner, id of the game

**output**: none

`io(/game).emit('resign', <winner>, <game_id>)`


## Run the Project Locally

### 1. Fork and Clone the repo

### 2. CD into `server` and run `yarn install` to download dependencies

### 3. In `server.js`, change line 33 to connect to your mongoDB instance.

### 4. Run `yarn start` to start the server

### 5. In a new terminal and from the root of the repo, CD into `client` and run `yarn install` to download dependencies

### 6. Create a `.env` file and paste in the following line `REACT_APP_API_URL=http://localhost:5000`.

### 7. Run `yarn start` to start the React App.

### 8. Play Connect 4!
