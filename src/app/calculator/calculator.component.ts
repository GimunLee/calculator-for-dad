import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

declare type SELECTED_TYPE = 'sCurrentData' | 'sDiscrepancyRate';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  calBalancedPointForm: FormGroup;
  calTypeForm: FormGroup;

  rBaseMoney: string;
  rCount: string;
  rDiscrepancyRate: string;
  rCurrentData: string;
  rTotalMoney: string;
  rSumMoeny: string;
  selectedData: SELECTED_TYPE = 'sCurrentData';

  constructor(
    private fb: FormBuilder,
  ) {
    this.calTypeForm = this.fb.group({
      calType: ['sCurrentData', [Validators.required]],
    });
    this.calBalancedPointForm = this.fb.group(
      {
        baseData: ['', [Validators.required], [this.numberValidator]],
        baseCount: ['', [Validators.required], [this.numberValidator]],
        balancedData: ['', [Validators.required], [this.numberValidator]],
        currentData: ['', [Validators.required], [this.numberValidator]],
      },
    );
  }

  ngOnInit(): void {

  }

  calculate() {
    const baseData = Number(this.calBalancedPointForm.get('baseData').value);
    const baseCount = Number(this.calBalancedPointForm.get('baseCount').value);
    const balancedData = Number(this.calBalancedPointForm.get('balancedData').value);

    if (this.selectedData === 'sCurrentData') { // 현재값으로 괴리율 계산
      const currentData = Number(this.calBalancedPointForm.get('currentData').value); // 현재값
      this.rDiscrepancyRate = (((balancedData - currentData) / currentData) * 100).toFixed(3);
      this.rCurrentData = String(currentData);
    } else if (this.selectedData === 'sDiscrepancyRate') { // 괴리율로 목표값 계산
      const discrepancyRate = Number(this.calBalancedPointForm.get('discrepancyRate').value); // 괴리율
      this.rCurrentData = ((balancedData * (100 - discrepancyRate)) / 100).toFixed(3);
    }

    this.rCount = ((baseData * baseCount - balancedData) / (balancedData + Number(this.rCurrentData))).toFixed(3);
    this.rTotalMoney = (Number(this.rCount) * Number(this.rCurrentData)).toFixed(0);
    this.rBaseMoney = (Number(baseData) * Number(baseCount)).toFixed(0);
    this.rSumMoeny = (Number(baseData) + Number(this.rTotalMoney)).toFixed(0);
  }

  numberValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      if (isNaN(control.value)) {
        // you have to return `{error: true}` to mark it as an error event
        observer.next({error: true, isNotNumber: true});
      } else {
        observer.next(null);
      }
      observer.complete();
    });

  resetForm(e: MouseEvent = null): void {
    if (e) {
      e.preventDefault();
    }
    this.calBalancedPointForm.reset();
    for (const key in this.calBalancedPointForm.controls) {
      this.calBalancedPointForm.controls[key].markAsPristine();
      this.calBalancedPointForm.controls[key].updateValueAndValidity();
    }
    this.rCount = '';
    this.rDiscrepancyRate = '';
    this.rCurrentData = '';
    this.rTotalMoney = '';
  }

  selectType(type: SELECTED_TYPE) {
    this.resetForm();
    this.selectedData = type;
    if (this.selectedData === 'sDiscrepancyRate') {
      this.calBalancedPointForm.removeControl('currentData');
      this.calBalancedPointForm.addControl('discrepancyRate', new FormControl('', [Validators.required], [this.numberValidator]));
    } else if (this.selectedData === 'sCurrentData') {
      this.calBalancedPointForm.removeControl('discrepancyRate');
      this.calBalancedPointForm.addControl('currentData', new FormControl('', [Validators.required], [this.numberValidator]));
    }
  }
}

