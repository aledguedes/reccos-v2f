import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationUpdateComponent } from './federation-update.component';

describe('FederationUpdateComponent', () => {
  let component: FederationUpdateComponent;
  let fixture: ComponentFixture<FederationUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FederationUpdateComponent]
    });
    fixture = TestBed.createComponent(FederationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
