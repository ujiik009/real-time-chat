// const express = require('express')
import express, { Application, Request, Response } from "express"

import * as socketio from 'socket.io';
const apiService: Application = express()
const server = require('http').Server(apiService);

const io: socketio.Server = new socketio.Server();
io.attach(server);
const port: Number = 3000



apiService.get('/', async (_: Request, res: Response) => {
    res.send('Hello World')
});

io.on('connection', (socket: socketio.Socket) => {
    console.log('connection',socket.id);
    socket.emit('status', 'Hello from Socket.io');

    socket.on('disconnect', () => {
        console.log('client disconnected',socket.id);
    })
});



server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

