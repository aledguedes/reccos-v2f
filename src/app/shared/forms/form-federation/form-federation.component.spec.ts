import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFederationComponent } from './form-federation.component';

describe('FormFederationComponent', () => {
  let component: FormFederationComponent;
  let fixture: ComponentFixture<FormFederationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFederationComponent]
    });
    fixture = TestBed.createComponent(FormFederationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
