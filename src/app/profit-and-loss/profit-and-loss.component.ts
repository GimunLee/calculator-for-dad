import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-calculator',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css']
})
export class ProfitAndLossComponent implements OnInit {
  exchangeForm: FormGroup;
  totalBuyPrice: number = 0;
  totalBuyCount: number = 0;

  resultData: any = {
    average: 0,
    count: 0,
    totalPrice: 0,
    profitAndLoss: 0,
  };

  constructor(
    private fb: FormBuilder,
  ) {
    this.exchangeForm = this.fb.group(
      {
        i_price: ['', [Validators.required], [this.numberValidator]],
        i_count: ['', [Validators.required], [this.numberValidator]],
      },
    );
  }


  ngOnInit(): void {
  }

  resetForm(e: MouseEvent = null): void {
    if (e) {
      e.preventDefault();
    }
    this.exchangeForm.reset();
    for (const key in this.exchangeForm.controls) {
      this.exchangeForm.controls[key].markAsPristine();
      this.exchangeForm.controls[key].updateValueAndValidity();
    }
    this.resetResult();
  }

  resetResult() {
    this.resultData.count = 0;
    this.resultData.profitAndLoss = 0;
    this.resultData.totalPrice = 0;
    this.resultData.average = 0;
    this.totalBuyPrice = 0;
    this.totalBuyCount = 0;
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

  buy() {
    const count = Number(this.exchangeForm.get('i_count').value);
    const price = Number(this.exchangeForm.get('i_price').value);
    this.resultData.count += count;
    this.totalBuyPrice += price * count;
    this.totalBuyCount += count;
    this.resultData.average = (this.totalBuyPrice / this.totalBuyCount).toFixed(0);
    console.log(this.resultData.count);
    this.resultData.totalPrice = this.resultData.count * this.resultData.average;
  }

  sell() {
    const count = Number(this.exchangeForm.get('i_count').value);
    const price = Number(this.exchangeForm.get('i_price').value);
    this.resultData.count -= Number(this.exchangeForm.get('i_count').value);
    this.resultData.totalPrice =  this.resultData.count * this.resultData.average;
    if (count === 0) {
      this.totalBuyPrice = 0;
      this.totalBuyCount = 0;
      this.resultData.average = 0;
    }
    this.resultData.profitAndLoss += (price - this.resultData.average) * count;
  }
}

