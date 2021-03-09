import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SocketIOScreenComponent } from './components/socket-ioscreen/socket-ioscreen.component';
import { AudioRecordScreenComponent } from './platform_components/audio-record-screen/audio-recorder-screen.component';
import { BarcodeScannerScreenComponent } from './platform_components/barcode-scanner-screen/barcode-scanner-screen.component';
import { CameraScreenComponent } from './platform_components/camera-screen/camera-screen.component';
import { FileSelectorScreenComponent } from './platform_components/file-selector-screen/file-chooser-screen.component';
import { GeolocationScreenComponent } from './platform_components/geolocation-screen/geolocation-screen.component';
import { ImageCropScreenComponent } from './platform_components/image-crop-screen/image-crop-screen.component';
import { LocalAuthScreenComponent } from './platform_components/local-auth-screen/local-auth-screen.component';
import { LocalNotificationScreenComponent } from './platform_components/local-notification-screen/local-notification-screen.component';
import { MediaCaptureScreenComponent } from './platform_components/media-capture-screen/media-capture-screen.component';
import { PdfViewerScreenComponent } from './platform_components/pdf-viewer-screen/pdf-viewer-screen.component';
import { PermissionsScreenComponent } from './platform_components/permissions-screen/permissions-screen.component';
import { ShareScreenComponent } from './platform_components/share-screen/share-screen.component';
import { SmsReadingScreenComponent } from './platform_components/sms-reading-screen/sms-reading-screen.component';
import { WebViewScreenComponent } from './platform_components/web-view-screen/web-view-screen.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'camera',
    component:CameraScreenComponent
  },
  {
    path: 'audiorecorder',
    component:AudioRecordScreenComponent
  },
  {
    path: 'filechooser',
    component:FileSelectorScreenComponent
  },
  {
    path: 'permissions',
    component:PermissionsScreenComponent
  },
  {
    path: 'webview',
    component:WebViewScreenComponent
  },
  {
    path: 'mediacapture',
    component:MediaCaptureScreenComponent
  },
  {
    path: 'share',
    component:ShareScreenComponent
  },
  {
    path: 'crop',
    component:ImageCropScreenComponent
  },
  {
    path: 'barcode',
    component:BarcodeScannerScreenComponent
  },
  {
    path: 'pdf',
    component:PdfViewerScreenComponent
  },
  {
    path: 'auth',
    component:LocalAuthScreenComponent
  },
  {
    path: 'notification',
    component:LocalNotificationScreenComponent
  },
  {
    path: 'socket',
    component:SocketIOScreenComponent
  },
  {
    path: 'geolocation',
    component:GeolocationScreenComponent
  },
  {
    path: 'sms',
    component:SmsReadingScreenComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
