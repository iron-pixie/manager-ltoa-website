import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUiWorkorderComponent } from './input-ui-workorder.component';

describe('InputUiWorkorderComponent', () => {
  let component: InputUiWorkorderComponent;
  let fixture: ComponentFixture<InputUiWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputUiWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUiWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
