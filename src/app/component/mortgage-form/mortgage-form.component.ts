import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ImortgageDetail } from 'src/app/shared/interface';

@Component({
  selector: 'app-mortgage-form',
  templateUrl: './mortgage-form.component.html',
  styleUrls: ['./mortgage-form.component.css'],
})
export class MortgageFormComponent implements OnInit {
  @Output() mortageDetails: EventEmitter<ImortgageDetail> = new EventEmitter<ImortgageDetail>();
  mortgageResult: any = {};
  paymentPlanForm = this.fb.group({
    mortgageAmount: ['100000.00', Validators.required],
    interstRate: ['5', [Validators.required]],
    amortizationPeriodYear: ['25', [Validators.required]],
    amortizationPeriodMonth: [''],
    paymentFrequency: ['M', [Validators.required]],
    term: ['5', [Validators.required]],
    prepaymentAmount: [
      { value: '0.00', disabled: true },
      [Validators.required],
    ],
    prepaymentFrequency: ['OT', [Validators.required]],
    startPayment: ['1', [Validators.required]],
  });

  amortizationYear: number[] = [];
  amortizationMonth: number[] = [];
  paymentFrequnecy: any[] = [];
  terms: number[] = [];
  prePaymentAmt: any[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //Drop-down option values
    this.amortizationYear = Array.from({ length: 30 }, (v, i) => i + 1);
    this.amortizationMonth = Array.from({ length: 11 }, (v, i) => i + 1);
    this.terms = Array.from({ length: 10 }, (v, i) => i + 1);
    this.paymentFrequnecy = [
      { id: 'AW', value: 'Accelerated Weekly' },
      { id: 'W', value: 'Weekly' },
      { id: 'AB', value: 'Accelerated Bi-weekly' },
      { id: 'B', value: 'Bi-weekly (every 2 weeks)' },
      { id: 'SM', value: 'semi-monthly (24x per year)' },
      { id: 'M', value: 'Monthly (12x per year)' },
    ];
    this.prePaymentAmt = [
      { id: 'OT', value: 'One time' },
      { id: 'EY', value: 'Each year' },
      { id: 'RP', value: 'Same as regular payment' },
    ];
  }

  calculatePaymentTerm = (value: string): number => {
    let term = +this.paymentPlanForm.get('term')?.value;
    switch (value) {
      case 'AW':
        return term * 52;
      case 'W':
        return term * 52;
      case 'AB':
        return term * 26;
      case 'B':
        return term * 26;
      case 'SM':
        return term * 24;
      case 'M':
        return term * 12;
      default:
        return 1;
    }
  };

  onSubmit = () => {
    //Mortgagr Calculation with M=P[i(1+i)^n]/[(1+i)^n-1]

    let termFrequent = this.paymentPlanForm.get('paymentFrequency')?.value;
    this.mortgageResult.numberOfPaymentTerms =
      this.calculatePaymentTerm(termFrequent);
    this.mortgageResult.prePaymentAmount =
      this.paymentPlanForm.get('prepaymentAmount')?.value;
    this.mortgageResult.principlePayment =
      +this.paymentPlanForm.get('mortgageAmount')?.value;
    let monthlyInterestRatio =
      this.paymentPlanForm.get('interstRate')?.value / 100 / 12;
    let numeratorValue = Math.pow(
      1 + monthlyInterestRatio,
      this.mortgageResult.numberOfPaymentTerms
    );
    let denominatorValue = numeratorValue - 1;
    let subCalc = numeratorValue / denominatorValue;
    this.mortgageResult.mortgagePayment =
      this.mortgageResult.principlePayment * monthlyInterestRatio * subCalc;
    this.mortgageResult.totalCost =
      this.mortgageResult.numberOfPaymentTerms * this.mortgageResult.mortgagePayment;
    this.mortgageResult.interestPayment =
      this.mortgageResult.totalCost - this.mortgageResult.principlePayment;
    
    //Emitting the calculated values in obj to the parent
    this.mortageDetails.emit(this.mortgageResult);
  };

  //Validating the FormControls
  validateInput = (inputName: string): any => {
    switch (inputName) {
      case 'mortgageAmount':
        if (
          this.paymentPlanForm.get('mortgageAmount')?.invalid ||
          +this.paymentPlanForm.get('mortgageAmount')?.value <= 0
        )
          return true;
        else return false;
      case 'interstRate':
        if (
          this.paymentPlanForm.get('interstRate')?.invalid ||
          this.paymentPlanForm.get('interstRate')?.value <= 0 ||
          this.paymentPlanForm.get('interstRate')?.value > 100
        )
          return true;
        else return false;
      case 'prepaymentAmount':
        if (
          this.paymentPlanForm.get('prepaymentAmount')?.invalid ||
          this.paymentPlanForm.get('prepaymentAmount')?.value < 0
        )
          return true;
        else return false;
      case 'startPayment':
        if (
          this.paymentPlanForm.get('startPayment')?.invalid ||
          this.paymentPlanForm.get('startPayment')?.value <= 0
        )
          return true;
        else return false;
      case 'amortizationPeriodYear':
        if (
          !(
            +this.paymentPlanForm.get('amortizationPeriodYear')?.value >=
            +this.paymentPlanForm.get('term')?.value
          )
        )
          return true;
        else return false;
    }
  };
}
