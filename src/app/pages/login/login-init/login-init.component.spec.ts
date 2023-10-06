import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInitComponent } from './login-init.component';

describe('LoginInitComponent', () => {
  let component: LoginInitComponent;
  let fixture: ComponentFixture<LoginInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginInitComponent]
    });
    fixture = TestBed.createComponent(LoginInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
