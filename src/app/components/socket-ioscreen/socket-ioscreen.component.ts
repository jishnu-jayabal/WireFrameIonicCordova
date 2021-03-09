import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
// import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-socket-ioscreen',
  templateUrl: './socket-ioscreen.component.html',
  styleUrls: ['./socket-ioscreen.component.scss'],
})
export class SocketIOScreenComponent implements OnInit {
  // message = '';
  // messages = [];
  // currentUser = '';
  chat_input;
  chats: any[] = [];
  socket: any;
  public myUserId: string;
  constructor(
    // private socket: Socket,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.socket = io.io('http://localhost:3000');
    this.receiveMessgae();
  }

  sendMessage(msg) {
    if (msg != '') {
      // Assign user typed message along with generated user id
      let saltedMsg = this.myUserId + "#" + msg;
      // Push the message through socket 
      this.socket.emit('message', saltedMsg);
    }
    this.chat_input = '';
  }

  receiveMessgae() {
    // Socket receiving method 
    this.socket.on('message', (msg) => {
      console.log(msg);
      this.chats.push(msg);
    });
  }

  // ngx-socket-io is not working in angular 11
  // so use socket-io-client
  // ngOnInit(){
  // this.socket.connect();

  // let name = `user-${new Date().getTime()}`;
  // this.currentUser = name;

  // this.socket.emit('set-name', name);

  // this.socket.fromEvent('users-changed').subscribe(data => {
  //   let user = data['user'];
  //   if (data['event'] === 'left') {
  //     this.showToast('User left: ' + user);
  //   } else {
  //     this.showToast('User joined: ' + user);
  //   }
  // });

  // this.socket.fromEvent('message').subscribe(message => {
  //   this.messages.push(message);
  // });
  // }
  // sendMessage() {
  //   this.socket.emit('send-message', { text: this.message });
  //   this.message = '';
  // }

  // ionViewWillLeave() {
  //   this.socket.disconnect();
  // }

  // async showToast(msg) {
  //   let toast = await this.toastCtrl.create({
  //     message: msg,
  //     position: 'top',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

}
