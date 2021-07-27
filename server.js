const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

let players = [];

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    }

    socket.on('dealCards', () => {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', (card, cardData, isPlayerA, xQuadrant, yQuadrant) => {
        io.emit('cardPlayed', card, cardData, isPlayerA, xQuadrant, yQuadrant);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, () => {
    console.log('Dead King\'s Hand server started!');
});

