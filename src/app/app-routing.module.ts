import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
