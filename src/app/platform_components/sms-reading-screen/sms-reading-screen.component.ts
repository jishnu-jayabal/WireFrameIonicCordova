import { Component, OnInit } from '@angular/core';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sms-reading-screen',
  templateUrl: './sms-reading-screen.component.html',
  styleUrls: ['./sms-reading-screen.component.scss'],
})
export class SmsReadingScreenComponent implements OnInit {

  message;
  isListening=false;
  appHash;
  constructor(
    private smsRetriever: SmsRetriever,
    private platform: Platform
  ) { }

  ngOnInit() {
    // this.platform.ready()
    // .then(()=>{
    //   this.startListening();
    // })
  }

  startListening() {
    this.smsRetriever.getAppHash()
      .then((res: any) =>{
        this.appHash = res;
        this.isListening = true;
      })
      .catch((error: any) => console.error(error));
   
    this.smsRetriever.startWatching()
      .then((res: any)=>{
        this.isListening = false;
        console.log(res.Message);
        this.message = res.Message;
      })
      .catch((error: any) => console.error(error));
  }

}
