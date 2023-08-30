import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInitComponent } from './player-init.component';

describe('PlayerInitComponent', () => {
  let component: PlayerInitComponent;
  let fixture: ComponentFixture<PlayerInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerInitComponent]
    });
    fixture = TestBed.createComponent(PlayerInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
