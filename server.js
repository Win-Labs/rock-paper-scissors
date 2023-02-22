const WebSocket = require("ws");
/* var Parse = require("parse/node");

Parse.initialize("k6yjP3igu9eX1WN0wlAhQmLuLDNo8eEnKgRHdMGo", "bRh6S9rqx6qqV2XvCJ7JPrFtErZzHwQgVizR50n9"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

async function saveNewPlayer() {
    //Create your Parse Object
    const soccerPlayer = new Parse.Object("SoccerPlayer");
    //Define its attributes
    soccerPlayer.set("playerName", "A. Wed");
    soccerPlayer.set("yearOfBirth", 1997);
    soccerPlayer.set("emailContact", "a.wed@email.io");
    soccerPlayer.set("attributes", ["fast", "good conditioning"]);
    try {
        //Save the Object
        const result = await soccerPlayer.save();
        console.log("New object created with objectId: " + result.id);
    } catch (error) {
        console.log("Failed to create new object: " + error.message);
    }
}

saveNewPlayer(); */

const data = [];

// Create a new WebSocket server instance
const server = new WebSocket.Server({ port: 3001 });

// Handle incoming WebSocket connections
server.on("connection", async socket => {
    console.log("New WebSocket connection");

    // Handle incoming WebSocket messages
    socket.on("message", message => {
        data.push(JSON.parse(message));
        console.log(data);
        if (data.length === 2) {
            socket.send(JSON.stringify({ player1: data[0].choice, player2: data[1].choice }));
            data.length = 0;
        }
    });

    // Handle WebSocket errors
    socket.on("error", error => {
        console.log(error);
    });

    // Handle Websocket disconnections
    socket.on("close", () => {
        console.log("WebSocket connection closed");
    });
});
