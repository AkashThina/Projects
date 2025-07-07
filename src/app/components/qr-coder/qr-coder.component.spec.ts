import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCoderComponent } from './qr-coder.component';

describe('QrCoderComponent', () => {
  let component: QrCoderComponent;
  let fixture: ComponentFixture<QrCoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
