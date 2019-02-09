import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsViolationComponent } from './details-violation.component';

describe('DetailsViolationComponent', () => {
  let component: DetailsViolationComponent;
  let fixture: ComponentFixture<DetailsViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
