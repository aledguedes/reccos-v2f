import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRefreeComponent } from './form-refree.component';

describe('FormRefreeComponent', () => {
  let component: FormRefreeComponent;
  let fixture: ComponentFixture<FormRefreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRefreeComponent]
    });
    fixture = TestBed.createComponent(FormRefreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
