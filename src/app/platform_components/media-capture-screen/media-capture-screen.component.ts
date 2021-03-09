import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Platform } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// ionic cordova plugin add cordova-plugin-telerik-imagepicker@2.3.3
//
@Component({
  selector: 'app-media-capture-screen',
  templateUrl: './media-capture-screen.component.html',
  styleUrls: ['./media-capture-screen.component.scss'],
})
export class MediaCaptureScreenComponent implements OnInit {

  imageFile;
  videoFile;

  constructor(
    private mediaCapture: MediaCapture,
    private imagePicker: ImagePicker,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    private platform: Platform,
    private webView: WebView,
    private videoEditor: VideoEditor,
    private androidPermissions: AndroidPermissions
  ) { }

  ngOnInit() {
    this.platform.ready()
      .then(data => {
        this.requestNecessaryPermissions();
      })
  }

  requestNecessaryPermissions() {

    // Change this array to conform with the permissions you need
    let androidPermissionsList = [
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ];

    return this.androidPermissions.requestPermissions(androidPermissionsList);
  }


  openImageFromCamera() {
    this.mediaCapture.captureImage({

    })
      .then((data: any) => {
        this.videoFile = null
        this.readFile(data[0].fullPath).then(base64 => {
          this.imageFile = base64;
        })
      })
  }

  openImageFromGallery() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      // Max width and height of the images
      // width: int,
      // height: int,
    }).then(data => {
      this.videoFile = null
      this.readFile(data[0]).then(base64 => {
        this.imageFile = base64;
      })
    })
  }

  openVideoFromCamera() {
    this.mediaCapture.captureVideo()
      .then(data => {
        this.imageFile = null
        // this.videoFile =this.webView.convertFileSrc(data[0].fullPath);
        // Compress Video
        this.filePath.resolveNativePath(data[0].fullPath)
          .then(realPath => {
            console.log(realPath);
            this.videoEditor.getVideoInfo({
              fileUri:realPath
            }).then(info=>{
              console.log("Video Info",info);
            })
            this.videoEditor.transcodeVideo({
              fileUri: realPath,
              outputFileName: 'output.mp4',
              outputFileType: this.videoEditor.OutputFileType.MPEG4,
              width:400,
              height:280,
              videoBitrate: 2639843
            }).then(compressedVideo => {
              console.log(compressedVideo);
              this.readFile("file://"+compressedVideo).then(base64=>{
                this.videoEditor.getVideoInfo({
                  fileUri:"file://"+compressedVideo
                }).then(info=>{
                  console.log("Comperessed Video Info",info);
                })
                console.log("Compressed Size",base64);
                this.videoFile = base64;
              })
            })

          })
          this.readFile(data[0].fullPath).then(base64=>{
            console.log("Original Size",base64);
            // this.videoFile = base64;
          })
      })
  }


  openVideoFromGallery() {
    // this.imagePicker.getPictures(
    //   {
    //     allow_video:true,
    //     maximumImagesCount:0
    //   }
    // ).then(data=>{
    //   this.videoFile =this.webView.convertFileSrc(data[0]);
    // });
    this.fileChooser.open({
      mime: "video/mp4"
    }).then(data => {
      console.log(data);
      this.videoFile = this.webView.convertFileSrc(data);
    })
  }

  async readFile(fullPath) {
    let result = fullPath;
    const name = result.substr(result.lastIndexOf("/") + 1);
    const path = result.substr(0, result.lastIndexOf("/") + 1);
    console.log(path, name);
    let base64 = await this.file.readAsDataURL(path, name);
    return base64;
  }

}
