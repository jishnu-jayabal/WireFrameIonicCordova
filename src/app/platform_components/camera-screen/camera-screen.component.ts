import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'app-camera-screen',
  templateUrl: './camera-screen.component.html',
  styleUrls: ['./camera-screen.component.scss'],
})
export class CameraScreenComponent implements OnInit {

  picture: string;
  video: string;
  showPicture: boolean = false;
  showVideo: boolean = false;
  showCamera: boolean = true;
  isRecording: boolean = false;

  cameraOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    camera: 'rear',
    width: window.innerWidth,
    height: window.innerHeight,
    toBack: true
  };

  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    quality: 100
  };

  constructor(
    private platform: Platform,
    private cameraPreview: CameraPreview,
    private file: File,
    private domSabitizer: DomSanitizer,
    private webview:WebView
  ) { }

  ngOnInit() {
    this.platform.ready()
      .then(() => {
        this.cameraPreview.stopCamera()
          .then(() => {
            this.startCamera();
          }).catch(err => {
            this.startCamera();
          })
      })
  }

  ionViewDidLoad() {

  }

  async startCamera() {
    this.picture = null;
    const result = await this.cameraPreview.startCamera(this.cameraOpts);
    this.cameraPreview.show();
    console.log(result);
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  async takePicture() {
    const result = await this.cameraPreview.takePicture(this.cameraPictureOpts);
    this.picture = `data:image/jpeg;base64,${result}`;
    this.cameraPreview.hide();
    this.showCamera = false;
    this.showPicture = true;
  }

  async recordVideo() {
    console.log(this.isRecording);
    let options: any = {
      cameraDirection: this.cameraPreview.CAMERA_DIRECTION.BACK,
      width: this.platform.width(),
      height: this.platform.height() + 25,
      quality: 100,
      withFlash: false
    };
    if (!this.isRecording) {
      await this.cameraPreview.startRecordVideo(options)
        .catch(err => {
          console.log(err);
        });
      this.isRecording = true;
    }

  }

  async stopRecording() {
    const result = await this.cameraPreview.stopRecordVideo();
    this.isRecording = false;
    this.showCamera = false;
    this.cameraPreview.hide();
    this.showVideo = true;
    if (this.platform.is('android')) {
      this.video = (<any>window).Ionic.WebView.convertFileSrc('file://' + result);
      // OR U Can Do Like This Figured It Out Later
      // this.video = this.webview.convertFileSrc('file://' + result);
      console.log(this.video, "path");
      // OR YOU CAN CONVERT TO BASE64 and Use it
      // const name = result.substr(result.lastIndexOf("/") + 1);
      // const path = 'file://' + result.substr(0, result.lastIndexOf("/") + 1);
      // console.log(path,name);
      // this.file.readAsDataURL(path,name).then((base64) => {
      //   console.log(base64);
      //   this.video =  this.domSabitizer.bypassSecurityTrustResourceUrl(base64);
      // }, (err) => {
      //   console.log('read err: ', err);
      // });
    }
  }

  backToCamera() {
    this.cameraPreview.show();
    this.showCamera = true;
    this.picture = null;
    this.video = null;
    this.showPicture = false;
    this.showVideo = false;
  }

}
