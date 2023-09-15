import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreeListComponent } from './refree-list.component';

describe('RefreeListComponent', () => {
  let component: RefreeListComponent;
  let fixture: ComponentFixture<RefreeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefreeListComponent]
    });
    fixture = TestBed.createComponent(RefreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
