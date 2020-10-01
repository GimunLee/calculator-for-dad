import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitAndLossComponent } from './profit-and-loss.component';

describe('CalculatorComponent', () => {
  let component: ProfitAndLossComponent;
  let fixture: ComponentFixture<ProfitAndLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitAndLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitAndLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
