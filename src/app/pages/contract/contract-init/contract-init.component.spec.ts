import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInitComponent } from './contract-init.component';

describe('ContractInitComponent', () => {
  let component: ContractInitComponent;
  let fixture: ComponentFixture<ContractInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractInitComponent]
    });
    fixture = TestBed.createComponent(ContractInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
