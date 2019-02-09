import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUiGuestsComponent } from './table-ui-guests.component';

describe('TableUiGuestsComponent', () => {
  let component: TableUiGuestsComponent;
  let fixture: ComponentFixture<TableUiGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUiGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUiGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
