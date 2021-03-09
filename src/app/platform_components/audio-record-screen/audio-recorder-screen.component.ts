import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { MediaCapture, MediaFile } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-audio-recorder-screen',
  templateUrl: './audio-recorder-screen.component.html',
  styleUrls: ['./audio-recorder-screen.component.scss'],
})
export class AudioRecordScreenComponent implements OnInit {

  audio: any;
  audioFile:FileEntry;
  mediaRec:MediaObject;
  recordInterval;
  recordTime = 0;
  isRecording:boolean = false;
  @ViewChild("audioTag") audioElement:ElementRef;

  constructor(
    // MediaCapture Uses the native recording app
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private domSanitizer:DomSanitizer,
    private platform: Platform,
    private webview:WebView
  ) { }

  ngOnInit() { 
    this.platform.ready()
    .then(()=>{});
  }

  async startRecording()  {
    // this.mediaCapture.captureAudio()
    //   .then((result: MediaFile[]) => {
    //     this.audio = (<any>window).Ionic.WebView.convertFileSrc(result[0].fullPath);
    //     OR U Can Do Like This Figured It Out Later
    //     this.audio = this.webview.convertFileSrc(result[0].fullPath);
    //   })
    this.audioFile = await this.file.createFile(this.file.externalCacheDirectory,`${new Date().getTime().toString()}.mp3`,true);
    console.log(this.audioFile);
    this.mediaRec = this.media.create(this.audioFile.nativeURL);
    this.isRecording = true;
    this.mediaRec.startRecord();
    this.recordInterval = setInterval(()=>{
      this.recordTime++;
    },1000);
  }

  pauseRecordng() {
    this.mediaRec.pause()
    clearInterval(this.recordInterval);
  }

  resumeRecording() {
    this.mediaRec.resumeRecord();
    this.recordInterval = setInterval(()=>{
      this.recordTime++;
    },10000);
  }

  stopRecording() {
    clearInterval(this.recordInterval);
    this.mediaRec.stopRecord();
    this.isRecording = false;
    this.recordTime = 0;
    this.playRecording();
  }

  playRecording() {
    // this.mediaRec.play();
    // OR YOU CAN USE audio tag to play
    this.audio = (<any>window).Ionic.WebView.convertFileSrc(this.audioFile.nativeURL);
    // OR YOU CAN CONVERT TO BASE64 and Use it
    // const name = this.audioFile.nativeURL.substr(this.audioFile.nativeURL.lastIndexOf("/") + 1);
    // const path = this.audioFile.nativeURL.substr(0, this.audioFile.nativeURL.lastIndexOf("/") + 1);
    // console.log(path,name);
    // this.file.readAsDataURL(path,name).then((base64) => {
    //   console.log(base64);
    //   this.audio = this.domSanitizer.bypassSecurityTrustResourceUrl(base64);
    // }, (err) => {
    //   console.log('read err: ', err);
    // });;
  }

  replayRecording() {
    this.audioElement.nativeElement.play();
  }

}
