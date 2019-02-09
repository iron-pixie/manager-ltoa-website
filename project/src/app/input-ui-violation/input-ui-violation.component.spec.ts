import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUiViolationComponent } from './input-ui-violation.component';

describe('InputUiViolationComponent', () => {
  let component: InputUiViolationComponent;
  let fixture: ComponentFixture<InputUiViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputUiViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUiViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
