import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-barcode-scanner-screen',
  templateUrl: './barcode-scanner-screen.component.html',
  styleUrls: ['./barcode-scanner-screen.component.scss'],
})
export class BarcodeScannerScreenComponent implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() { }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
