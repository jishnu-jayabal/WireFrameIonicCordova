import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-local-notification-screen',
  templateUrl: './local-notification-screen.component.html',
  styleUrls: ['./local-notification-screen.component.scss'],
})
export class LocalNotificationScreenComponent implements OnInit {

  constructor(
    private localNotifications: LocalNotifications
  ) { }

  ngOnInit() {}

  showNotificationWithDefaultSound() {
    
    this.localNotifications.requestPermission()
    .then(data=>{
      if(data){
        this.localNotifications.schedule({
          id: 1,
          text: 'Single ILocalNotification',
          sound:"res://platform_default",
          data: { secret: "key" }
        });
        
        
        // Schedule multiple notifications
        this.localNotifications.schedule([{
           id: 1,
           text: 'Multi ILocalNotification 1',
           sound:"res://platform_default",
           data: { secret:"key" }
          },{
           id: 2,
           title: 'Local ILocalNotification Example',
           sound:"res://platform_default",
           text: 'Multi ILocalNotification 2',
           icon: 'http://example.com/icon.png'
        }]);
        
        
        // Schedule delayed notification
        this.localNotifications.schedule({
           text: 'Delayed ILocalNotification',
           trigger: {at: new Date(new Date().getTime() + 3600)},
           led: 'FF0000',
           sound: null
        });
      }
    });
  }

  showNotificationWithCustomSound() {
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      sound:"res://not.mp3",
      data: { secret:"key" }
     },{
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png',
      sound:"file://assets/not.mp3",
   }]);
   
  }

}
