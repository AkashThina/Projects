import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'app-qr-coder',
  standalone: true,
  imports: [QRCodeComponent, FormsModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule], // ✅ this is correct
  templateUrl: './qr-coder.component.html',
  styleUrls: ['./qr-coder.component.css']  // typo: should be `styleUrls` not `styleUrl`
})
export class QrCoderComponent {
  amount: number | null = null;
  data: string = '';
  isExpired = false;
  timeLeft = 120;
  countdownInterval: any;

  upiId: string = 'akashthina8800@okaxis';
  payeeName: string = 'Akash Thina';
  constructor(private input: InputService) { }
  generateQR() {
    const parsedAmount = parseFloat(this.amount as any);

    console.log('Raw entered value:', this.amount);
    console.log('Parsed number:', parsedAmount);

    if (!this.amount || this.amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const note = encodeURIComponent('Payment to Akash');

    this.data = `upi://pay?pa=${this.upiId}&pn=${this.payeeName}&am=${this.amount}&cu=INR&tn=${note}`;
    this.isExpired = false;
    this.timeLeft = 120;

    if (this.countdownInterval) clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) this.expireQR();
    }, 1000);
  }

  expireQR() {
    this.isExpired = true;
    this.data = '';
    clearInterval(this.countdownInterval);
  }

  formatTime(): string {
    const min = Math.floor(this.timeLeft / 60);
    const sec = this.timeLeft % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

   numberOnly(event: any) {
    this.input.numberOnly(event)
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
