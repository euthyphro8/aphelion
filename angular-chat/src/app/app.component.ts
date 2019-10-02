
import { Component } from '@angular/core';
import { ISocketMessage } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private username: string;
  private io: {
    emit: (key: string, value: string) => void,
    on: (event: string, callback: (data: ISocketMessage) => void) => void
  };
}
