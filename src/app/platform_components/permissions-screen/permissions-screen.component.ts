import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-permissions-screen',
  templateUrl: './permissions-screen.component.html',
  styleUrls: ['./permissions-screen.component.scss'],
})
export class PermissionsScreenComponent implements OnInit {

  androidPermissions = [];
  androidPermissionsStatus = [];
  constructor(
    private permission: AndroidPermissions,
    private platform:Platform
  ) { }

  ngOnInit() {
    this.platform.ready()
    .then(()=>{
      this.getAllPermissions();
    });
  }

  getAllPermissions() {
    for (let a in this.permission.PERMISSION) {
      this.androidPermissions.push(a);
      this.androidPermissionsStatus.push(false);
    }
  }

  checkPermissions(permissionName: string, index: number) {

    this.permission.checkPermission(permissionName)
      .then(data => {
        this.androidPermissionsStatus[index] = data.hasPermission;

        if (!data.hasPermission) {
          
          this.permission.requestPermission(this.permission.PERMISSION[permissionName])
            .then(data => {
              console.log(data);
              if (data.hasPermission) {
                this.androidPermissionsStatus[index] = data.hasPermission;
              }
            }).catch(err => { console.log(err); })
        }
      })
  }

}
