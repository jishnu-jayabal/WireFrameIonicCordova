import { Component, OnInit } from '@angular/core';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-local-auth-screen',
  templateUrl: './local-auth-screen.component.html',
  styleUrls: ['./local-auth-screen.component.scss'],
})
export class LocalAuthScreenComponent implements OnInit {

  constructor(
    private androidFingerprintAuth: AndroidFingerprintAuth
  ) { }

  ngOnInit() { }

  authenticateUsingFingerPrint() {
    this.androidFingerprintAuth.isAvailable()
      .then((result) => {
        if (result.isAvailable) {
          // it is available

          this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
              if (result.withFingerprint) {
                console.log('Successfully encrypted credentials.');
                console.log('Encrypted credentials: ' + result.token);
              } else if (result.withBackup) {
                console.log('Successfully authenticated with backup password!');
              } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                console.log('Fingerprint authentication cancelled');
              } else console.error(error)
            });

        } else {
          // fingerprint auth isn't available
        }
      })
      .catch(error => console.error(error));
  }

}
