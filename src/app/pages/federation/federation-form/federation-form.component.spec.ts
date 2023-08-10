import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationFormComponent } from './federation-form.component';

describe('FederationFormComponent', () => {
  let component: FederationFormComponent;
  let fixture: ComponentFixture<FederationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FederationFormComponent]
    });
    fixture = TestBed.createComponent(FederationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
