import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumInitComponent } from './stadium-init.component';

describe('StadiumInitComponent', () => {
  let component: StadiumInitComponent;
  let fixture: ComponentFixture<StadiumInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadiumInitComponent]
    });
    fixture = TestBed.createComponent(StadiumInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
