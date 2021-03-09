import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-file-chooser-screen',
  templateUrl: './file-chooser-screen.component.html',
  styleUrls: ['./file-chooser-screen.component.scss'],
})
export class FileSelectorScreenComponent implements OnInit {

  imageFile;
  videoFile;

  constructor(
    private fileChooser: FileChooser,
    private domSanitizer: DomSanitizer,
    private file: File,
    private filePath: FilePath,
    private platform: Platform,
    private webView:WebView
  ) { }

  ngOnInit() { }

  pickFile() {
    // Really you could just get a input tag and get it done with
    this.platform.ready()
      .then(() => {
        this.fileChooser.open()
          .then(path => {
            console.log(path);
            this.showFile(path);
          })

      });
  }

  showFile(result) {
    // Use a combination of both these methods
    // this.imageFile = (<any>window).Ionic.WebView.convertFileSrc(result);
    // OR U Can Do Like This Figured It Out Later
    // this.imageFile = this.webview.convertFileSrc(result);
    // console.log(this.imageFile);
    // OR CONVERT IT TO BASE64 using File & FilePath
    // Need to use FilePath to convert the returned uri to file:///format
    this.filePath.resolveNativePath(result)
      .then(filePath => {
        console.log(filePath);
        const ext = filePath.substr(filePath.lastIndexOf(".") + 1)
        const name = filePath.substr(filePath.lastIndexOf("/") + 1);
        const path = filePath.substr(0, filePath.lastIndexOf("/") + 1);
        console.log(path, name);
        this.file.readAsDataURL(path, name).then((base64) => {
          console.log(base64);
          if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
            this.videoFile = null
            this.imageFile = this.domSanitizer.bypassSecurityTrustResourceUrl(base64);
          } else {
            this.imageFile = null;
            this.videoFile = this.domSanitizer.bypassSecurityTrustResourceUrl(base64);
          }
        }, (err) => {
          console.log('read err: ', err);
        });
      })
      .catch(err => console.log(err));
  }

}
