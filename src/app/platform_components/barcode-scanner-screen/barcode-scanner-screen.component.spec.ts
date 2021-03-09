import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarcodeScannerScreenComponent } from './barcode-scanner-screen.component';

describe('BarcodeScannerScreenComponent', () => {
  let component: BarcodeScannerScreenComponent;
  let fixture: ComponentFixture<BarcodeScannerScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeScannerScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarcodeScannerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
