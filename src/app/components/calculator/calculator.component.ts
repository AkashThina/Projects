import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  calculatorForm!: FormGroup;
  show: boolean = false
  tableData: any[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.calculatorForm = this.fb.group({
      initialAmount: [null, [Validators.required, Validators.min(1)]],
      numberOfYears: [null, [Validators.required, Validators.min(1)]],
      stepUpDuration: [null, [Validators.required, Validators.min(1)]],
      stepUpValue: [null, [Validators.required, Validators.min(0)]]
    });
  }

 onSubmit(): void {
  if (this.calculatorForm.valid) {
    this.show = true
    const { initialAmount, numberOfYears, stepUpValue } = this.calculatorForm.value;
    const totalMonths = numberOfYears * 12;

    let data = [];
    let currentAmount = Number(initialAmount);
    let stepUp = Number(stepUpValue);
    let cumulative = 0;

    const startDate = new Date(2025, 5); // June 2025

    for (let i = 0; i < totalMonths; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      cumulative += currentAmount;

      data.push({
        sNo: i + 1,
        displayMonth: `${monthName} ${year}`,
        amount: Number(currentAmount.toFixed(2)),
        cumulative: Number(cumulative.toFixed(2))
      });

      currentAmount += stepUp;
    }

    this.tableData = data;
  } else {
    this.show = false
    this.calculatorForm.markAllAsTouched();
  }
}


  numberOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
