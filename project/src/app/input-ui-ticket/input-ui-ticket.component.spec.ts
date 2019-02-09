import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUiTicketComponent } from './input-ui-ticket.component';

describe('InputUiTicketComponent', () => {
  let component: InputUiTicketComponent;
  let fixture: ComponentFixture<InputUiTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputUiTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUiTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
