import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUiWorkorderComponent } from './table-ui-workorder.component';

describe('TableUiViolationComponent', () => {
  let component: TableUiWorkorderComponent;
  let fixture: ComponentFixture<TableUiWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUiWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUiWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
