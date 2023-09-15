import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInitComponent } from './team-init.component';

describe('TeamInitComponent', () => {
  let component: TeamInitComponent;
  let fixture: ComponentFixture<TeamInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamInitComponent]
    });
    fixture = TestBed.createComponent(TeamInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
