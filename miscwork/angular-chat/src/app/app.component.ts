
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ISocketMessage } from './interfaces';
import * as socket from 'socket.io-client/dist/socket.io';
import { SocketEvents } from './socket-events';
import { SocketMessage } from './socket-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('messages', { static: true }) public messages: ElementRef<HTMLUListElement>;
  @ViewChild('inputMessage', { static: true }) public inputMessage: ElementRef<HTMLInputElement>;

  public message: string;
  public allMessages: ISocketMessage[] = [];
  private username: string;
  private io: {
    emit: (key: string, value: string) => void,
    on: (event: string, callback: (data: ISocketMessage) => void) => void
  };
  private isConnected = false;

  constructor() {
    this.io = socket('https://cs4350sockets.herokuapp.com');

    while (!this.username) {
      this.username = prompt('Enter a username.');
    }

    this.setupListeners();
    this.io.emit(SocketEvents.AddUser, this.username);
  }

  public addParticipantsMessage(data: ISocketMessage) {
    this.log(data.numUsers === 1 ? 'There is 1 participant.' : `There are ${data.numUsers} participants.`);
  }

  public sendMessage() {
    if (this.message && this.isConnected) {
      this.addChatMessage({
        username: this.username,
        message: this.message
      });
      this.io.emit(SocketEvents.NewMessage, this.message);
      this.message = '';
    }
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const input = this.inputMessage.nativeElement;
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      input.focus();
    }

    if (event.which === 13) {
      this.sendMessage();
      input.value = '';
    }
  }

  public log(message: string, shouldPrepend?: boolean) {
    const msg = { isLog: true, message } as ISocketMessage;
    if (shouldPrepend) {
      this.allMessages.unshift(msg);
    } else {
      this.allMessages.push(msg);
    }
    this.scrollToMessageTop();
  }

  public addChatMessage(data: ISocketMessage) {
    data.isLog = false;
    data.color = this.getUsernameColor(data.username);
    this.allMessages.push(data);
    this.scrollToMessageTop();
  }

  public scrollToMessageTop() {
    if (!this.messages) {
      return;
    }
    const ul = this.messages.nativeElement;
    ul.scrollTop = ul.scrollHeight;
  }

  public getUsernameColor(username: string) {
    const array = [];
    for (let n = 0, i = username.length; n <  i; n++) {
      const hex = Number(username.charCodeAt(n)).toString(16);
      array.push(hex);
    }
    return `#${array.join('').substring(0, 6)}`;
  }

  public inputMessageClick(event: MouseEvent) {
    this.inputMessage.nativeElement.focus();
  }

  private setupListeners() {
    this.io.on(SocketEvents.Login, (data) => {
      this.isConnected = true;
      this.log(SocketMessage.Welcome, true);
      this.addParticipantsMessage(data);
    });

    this.io.on(SocketEvents.NewMessage, (data) => {
      this.addChatMessage(data);
    });

    this.io.on(SocketEvents.UserJoined, (data) => {
      this.log(data.username + ' joined!');
    });

    this.io.on(SocketEvents.UserLeft, (data) => {
      this.log(data.username + ' left!');
    });

    this.io.on(SocketEvents.Disconnect, (data) => {
      this.log(SocketMessage.Disconnected);
    });

    this.io.on(SocketEvents.Reconnect, (data) => {
      this.log(SocketMessage.Reconnected);
      if (this.username) {
        this.io.emit(SocketEvents.AddUser, this.username);
      }

    });

    this.io.on(SocketEvents.ReconnectError, (data) => {
      this.log(SocketMessage.UnableToReconnect);

    });
  }

}
