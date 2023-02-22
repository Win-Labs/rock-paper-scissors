const WebSocket = require("ws");

rules = {
    paper: { winsOver: "rock" },
    rock: { winsOver: "scissors" },
    scissors: { winsOver: "paper" },
};

const determineWinner = (player1, player2) => {
    return (rules[player1].winsOver === player2 && "player") || (player1 === player2 && "none") || "opponent";
};

const choices = [];

// Create a new WebSocket server instance
const server = new WebSocket.Server({ port: 3001 });

// Handle incoming WebSocket connections
server.on("connection", socket => {
    console.log("New WebSocket connection");

    // Handle incoming WebSocket messages
    socket.on("message", message => {
        choices.push(message);
    });

    // Echo the message back to the client
    if (choices.length === 2) {
        socket.send(determineWinner(choices[0], choices[1]));
        choices = [];
    }

    // Handle WebSocket errors
    socket.on("error", error => {
        console.log(error);
    });

    // Handle Websocket disconnections
    socket.on("close", () => {
        console.log("WebSocket connection closed");
    });
});
