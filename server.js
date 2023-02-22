const WebSocket = require("ws");

rules = {
    paper: { winsOver: "rock" },
    rock: { winsOver: "scissors" },
    scissors: { winsOver: "paper" },
};

const determineWinner = (player1, player2) => {
    return (rules[player1].winsOver === player2 && "player") || (player1 === player2 && "none") || "opponent";
};

const data = [];

// Create a new WebSocket server instance
const server = new WebSocket.Server({ port: 3001 });

// Handle incoming WebSocket connections
server.on("connection", async socket => {
    console.log("New WebSocket connection");

    // Handle incoming WebSocket messages
    socket.on("message", message => {
        data.push(JSON.parse(message));
        if (data.length === 2) {
            socket.send(determineWinner(data[0].choice, data[1].choice));
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
