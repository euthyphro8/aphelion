

import io from "socket.io-client";


class Client {

    socket: SocketIOClient.Socket;

    constructor() {
        let options = {
            autoConnect: false
        } as SocketIOClient.ConnectOpts;

        this.socket = io('http://localhost:3000', options);
        this.socket.on('connect', this.onConnected);
        console.log('starting client');

        this.socket.on('ID', this.onId);
        this.socket.connect();
    }

    private onConnected() : void {
        
    }

    private onId(): void {

    }
}

export default Client;