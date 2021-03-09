import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-web-view-screen',
  templateUrl: './web-view-screen.component.html',
  styleUrls: ['./web-view-screen.component.scss'],
})
export class WebViewScreenComponent implements OnInit {

  constructor(
    private inAppBrowser:InAppBrowser
  ) { }

  ngOnInit() {}

  openUrl(){
    this.inAppBrowser.create("http://www.google.com")
    .show();
  }

}
