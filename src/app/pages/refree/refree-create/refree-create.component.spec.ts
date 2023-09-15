import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreeCreateComponent } from './refree-create.component';

describe('RefreeCreateComponent', () => {
  let component: RefreeCreateComponent;
  let fixture: ComponentFixture<RefreeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreeCreateComponent]
    });
    fixture = TestBed.createComponent(RefreeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
