import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueUpdateComponent } from './league-update.component';

describe('LeagueUpdateComponent', () => {
  let component: LeagueUpdateComponent;
  let fixture: ComponentFixture<LeagueUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueUpdateComponent]
    });
    fixture = TestBed.createComponent(LeagueUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
