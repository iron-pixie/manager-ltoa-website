import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUiInterfaceComponent } from './table-ui-interface.component';

describe('TableUiInterfaceComponent', () => {
  let component: TableUiInterfaceComponent;
  let fixture: ComponentFixture<TableUiInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUiInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUiInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
