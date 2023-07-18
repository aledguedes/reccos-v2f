import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationListComponent } from './federation-list.component';

describe('FederationListComponent', () => {
  let component: FederationListComponent;
  let fixture: ComponentFixture<FederationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FederationListComponent]
    });
    fixture = TestBed.createComponent(FederationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
