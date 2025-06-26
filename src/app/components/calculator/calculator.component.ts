import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;



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
      this.show = true;
      const { initialAmount, numberOfYears, stepUpValue, stepUpDuration } = this.calculatorForm.value;
      const totalMonths = numberOfYears * 12;

      let data = [];
      let currentAmount = Number(initialAmount);
      let stepUp = Number(stepUpValue);
      let duration = Number(stepUpDuration);
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

        // Only add stepUp after every stepUpDuration
        if ((i + 1) % duration === 0) {
          currentAmount += stepUp;
        }
      }

      this.tableData = data;
    } else {
      this.show = false;
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

  downloadCSV(): void {
    const table = document.getElementById('myTable');
    if (!table) {
      console.error('Table not found!');
      return;
    }

    const rows = table.querySelectorAll('tr');
    let csv = '';

    rows.forEach(row => {
      const cols = row.querySelectorAll('th, td');
      const rowData = Array.from(cols)
        .map(col => `"${col.textContent?.trim()}"`)
        .join(',');
      csv += rowData + '\n';
    });

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadPDF(): void {
    const tableBody = [
      ['S.No', 'Month - Year', 'Investment Amount (₹)', 'Cumulative Investment (₹)'], // Header row
      ...this.tableData.map(row => [
        row.sNo,
        row.displayMonth,
        `₹${row.amount}`,
        `₹${row.cumulative}`
      ])
    ];

    const docDefinition = {
      content: [
        { text: 'Investment Summary', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*'],
            body: tableBody
          },
          layout: {
            fillColor: (rowIndex: number) => {
              return rowIndex === 0
                ? '#dee2e6' // Bootstrap header gray
                : rowIndex % 2 === 0
                  ? '#f8f9fa' // Zebra striping like .table-striped
                  : null;
            },
            hLineColor: () => '#adb5bd',
            vLineColor: () => '#adb5bd',
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            paddingLeft: () => 8,
            paddingRight: () => 8,
            paddingTop: () => 5,
            paddingBottom: () => 5
          }
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          marginBottom: 10
        }
      },
    };

    pdfMake.createPdf(docDefinition).download('investment-table.pdf');
  }
}
