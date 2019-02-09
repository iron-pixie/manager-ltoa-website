import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUiViolationComponent } from './table-ui-violation.component';

describe('TableUiViolationComponent', () => {
  let component: TableUiViolationComponent;
  let fixture: ComponentFixture<TableUiViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUiViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUiViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
