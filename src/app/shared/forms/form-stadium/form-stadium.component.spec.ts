import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStadiumComponent } from './form-stadium.component';

describe('FormStadiumComponent', () => {
  let component: FormStadiumComponent;
  let fixture: ComponentFixture<FormStadiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormStadiumComponent]
    });
    fixture = TestBed.createComponent(FormStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
