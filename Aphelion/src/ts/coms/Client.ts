

import io from "socket.io-client";


class Client {

    connection: SocketIOClient.Socket;

    constructor() {
        let options = {
            autoConnect: false
        } as SocketIOClient.ConnectOpts;

        this.connection = io('http://localhost:3000', options);
        this.connection.on('connect', this.onConnected);
        console.log('starting client');
        this.connection.connect();
    }

    onConnected() : void {
        console.log('connected');
    }
}

export default Client;