import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumCreateComponent } from './stadium-create.component';

describe('StadiumCreateComponent', () => {
  let component: StadiumCreateComponent;
  let fixture: ComponentFixture<StadiumCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadiumCreateComponent]
    });
    fixture = TestBed.createComponent(StadiumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
