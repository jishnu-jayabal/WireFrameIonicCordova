import { Component, OnInit } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-image-crop-screen',
  templateUrl: './image-crop-screen.component.html',
  styleUrls: ['./image-crop-screen.component.scss'],
})
export class ImageCropScreenComponent implements OnInit {

  imageFile;

  constructor(
    private crop:Crop,
    private imagePicker:ImagePicker,
    private file: File
  ) { }

  ngOnInit() {}

  selectAndCrop() {
    this.imagePicker.getPictures({maximumImagesCount:1})
    .then(data=>{
      this.crop.crop(data[0],{})
      .then(croppedImageData=>{
        const filePath = croppedImageData;
        const name = filePath.substr(filePath.lastIndexOf("/") + 1 , filePath.lastIndexOf("?")-(filePath.lastIndexOf('/') + 1));
        const path = filePath.substr(0, filePath.lastIndexOf("/") + 1);
        console.log(path, name , filePath.indexOf("?"));
        this.file.readAsDataURL(path, name).then((base64) => {
          this.imageFile = base64;
        }, (err) => {
          console.log('read err: ', err);
        });
      })
    })

  }

}
