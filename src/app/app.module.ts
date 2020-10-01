import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ko from '@angular/common/locales/ko';
import {
  NzButtonModule,
  NzDividerModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzTableModule, NzTabsModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import { ProfitAndLossComponent } from './profit-and-loss/profit-and-loss.component';

registerLocaleData(ko);

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ProfitAndLossComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzTypographyModule,
    NzDividerModule,
    NzTabsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: ko_KR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
