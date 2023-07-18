import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationCreateComponent } from './federation-create.component';

describe('FederationCreateComponent', () => {
  let component: FederationCreateComponent;
  let fixture: ComponentFixture<FederationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FederationCreateComponent]
    });
    fixture = TestBed.createComponent(FederationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
