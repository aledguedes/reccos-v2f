import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumUpdateComponent } from './stadium-update.component';

describe('StadiumUpdateComponent', () => {
  let component: StadiumUpdateComponent;
  let fixture: ComponentFixture<StadiumUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadiumUpdateComponent]
    });
    fixture = TestBed.createComponent(StadiumUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
