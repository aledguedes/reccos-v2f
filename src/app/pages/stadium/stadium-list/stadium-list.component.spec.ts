import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumListComponent } from './stadium-list.component';

describe('StadiumListComponent', () => {
  let component: StadiumListComponent;
  let fixture: ComponentFixture<StadiumListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadiumListComponent]
    });
    fixture = TestBed.createComponent(StadiumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
