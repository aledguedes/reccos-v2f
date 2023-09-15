import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContractComponent } from './form-contract.component';

describe('FormContractComponent', () => {
  let component: FormContractComponent;
  let fixture: ComponentFixture<FormContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormContractComponent]
    });
    fixture = TestBed.createComponent(FormContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
