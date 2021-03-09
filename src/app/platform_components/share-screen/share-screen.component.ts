import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share-screen',
  templateUrl: './share-screen.component.html',
  styleUrls: ['./share-screen.component.scss'],
})
export class ShareScreenComponent implements OnInit {

  constructor(
    private socialSharing:SocialSharing,
    private imagePicker: ImagePicker,
    private fileChooser: FileChooser,
    private filePath:FilePath
  ) { }

  ngOnInit() {}

  shareText(){
    this.socialSharing.share("Hello World","hello world text");
  }

  shareImage(){
    this.imagePicker.getPictures({})
    .then(data=>{
      this.socialSharing.share("Image Sharing","image sharing sgssg",data);
    })
  }

  shareVideo(){
    this.fileChooser.open({
      mime:"video/mp4",
      
    }).then(async (data)=>{
      console.log(data);
      const path = await this.filePath.resolveNativePath(data);
      console.log(path);
      this.socialSharing.share("Video Sharing","video sharing sgssg",[path]);
    });
  }

  shareLink(){
    this.socialSharing.share("http://www.google.com","hello world link");
  }

}
