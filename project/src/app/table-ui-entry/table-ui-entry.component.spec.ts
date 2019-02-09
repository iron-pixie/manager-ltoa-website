import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUiEntryComponent } from './table-ui-entry.component';

describe('TableUiEntryComponent', () => {
  let component: TableUiEntryComponent;
  let fixture: ComponentFixture<TableUiEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUiEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
