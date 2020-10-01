import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { ProfitAndLossComponent } from './profit-and-loss/profit-and-loss.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 're-balancing',
    pathMatch: 'full',
  },
  {
    path: 're-balancing',
    component: CalculatorComponent,
    pathMatch: 'full',
  },
  {
    path: 'profit-and-loss',
    component: ProfitAndLossComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
