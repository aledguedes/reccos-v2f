import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreeInitComponent } from './refree-init.component';

describe('RefreeInitComponent', () => {
  let component: RefreeInitComponent;
  let fixture: ComponentFixture<RefreeInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreeInitComponent]
    });
    fixture = TestBed.createComponent(RefreeInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
