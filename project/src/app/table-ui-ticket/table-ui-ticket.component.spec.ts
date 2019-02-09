import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUiTicketComponent } from './table-ui-ticket.component';

describe('TableUiViolationComponent', () => {
  let component: TableUiTicketComponent;
  let fixture: ComponentFixture<TableUiTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUiTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUiTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
