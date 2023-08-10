import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInitComponent } from './league-init.component';

describe('LeagueInitComponent', () => {
  let component: LeagueInitComponent;
  let fixture: ComponentFixture<LeagueInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueInitComponent]
    });
    fixture = TestBed.createComponent(LeagueInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
