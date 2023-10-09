import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserImageComponent } from './change-user-image.component';

describe('ChangeUserImageComponent', () => {
  let component: ChangeUserImageComponent;
  let fixture: ComponentFixture<ChangeUserImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUserImageComponent]
    });
    fixture = TestBed.createComponent(ChangeUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
