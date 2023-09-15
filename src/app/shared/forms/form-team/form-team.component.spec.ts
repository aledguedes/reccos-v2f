import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTeamComponent } from './form-team.component';

describe('FormTeamComponent', () => {
  let component: FormTeamComponent;
  let fixture: ComponentFixture<FormTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTeamComponent]
    });
    fixture = TestBed.createComponent(FormTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
