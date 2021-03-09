import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CameraScreenComponent } from './platform_components/camera-screen/camera-screen.component';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { FormsModule } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { AudioRecordScreenComponent } from './platform_components/audio-record-screen/audio-recorder-screen.component';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileSelectorScreenComponent } from './platform_components/file-selector-screen/file-chooser-screen.component';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { PermissionsScreenComponent } from './platform_components/permissions-screen/permissions-screen.component';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { WebViewScreenComponent } from './platform_components/web-view-screen/web-view-screen.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MediaCaptureScreenComponent } from './platform_components/media-capture-screen/media-capture-screen.component';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ShareScreenComponent } from './platform_components/share-screen/share-screen.component';
import { ImageCropScreenComponent } from './platform_components/image-crop-screen/image-crop-screen.component';
import { Crop } from '@ionic-native/crop/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { BarcodeScannerScreenComponent } from './platform_components/barcode-scanner-screen/barcode-scanner-screen.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { PdfViewerScreenComponent } from './platform_components/pdf-viewer-screen/pdf-viewer-screen.component';
import { LocalAuthScreenComponent } from './platform_components/local-auth-screen/local-auth-screen.component';
import { LocalNotificationScreenComponent } from './platform_components/local-notification-screen/local-notification-screen.component';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SocketIOScreenComponent } from './components/socket-ioscreen/socket-ioscreen.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationScreenComponent } from './platform_components/geolocation-screen/geolocation-screen.component';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { SmsReadingScreenComponent } from './platform_components/sms-reading-screen/sms-reading-screen.component';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
// SocketIoModule from ngrx-socket-io not working with angular 11
// instead directly used socket-io-client

@NgModule({
  declarations: [AppComponent, 
    CameraScreenComponent, AudioRecordScreenComponent, 
    FileSelectorScreenComponent,PermissionsScreenComponent,
    WebViewScreenComponent,MediaCaptureScreenComponent,
    ShareScreenComponent,ImageCropScreenComponent,BarcodeScannerScreenComponent,
    PdfViewerScreenComponent,LocalAuthScreenComponent,LocalNotificationScreenComponent,
    SocketIOScreenComponent,GeolocationScreenComponent,SmsReadingScreenComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,
  
  ],
  providers: [
    File,
    FilePath,
    CameraPreview,
    Media,
    WebView,
    MediaCapture,   
    ImagePicker,
    FileChooser,
    AndroidPermissions,
    SocialSharing,
    InAppBrowser,
    Crop,
    VideoEditor,
    DocumentViewer,
    AndroidFingerprintAuth,
    LocalNotifications,
    Geolocation,NativeGeocoder,
    SmsRetriever,
    // Issues when adding phonegap-barcode-scanner & cordova-camera plugin as both adds the same 
    // uses-feature tag with different attributes
    // <uses-feature android:name="android.hardware.camera"/>
    // <uses-feature android:name="android.hardware.camera" android:required="true" />
    // many plugins have issues like this when they are added to same project
    // use cordova hooks to fix this
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { 
}
