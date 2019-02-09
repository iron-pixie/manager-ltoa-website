import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGuestsComponent } from './display-guests.component';

describe('DisplayGuestsComponent', () => {
  let component: DisplayGuestsComponent;
  let fixture: ComponentFixture<DisplayGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
