import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiGuestComponent } from './add-multi-guest.component';

describe('AddMultiGuestComponent', () => {
  let component: AddMultiGuestComponent;
  let fixture: ComponentFixture<AddMultiGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMultiGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultiGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
