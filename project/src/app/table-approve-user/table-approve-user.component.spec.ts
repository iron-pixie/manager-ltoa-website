import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableApproveUserComponent } from './table-approve-user.component';

describe('TableApproveUserComponent', () => {
  let component: TableApproveUserComponent;
  let fixture: ComponentFixture<TableApproveUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableApproveUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableApproveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
