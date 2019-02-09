import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWorkorderComponent } from './details-workorder.component';

describe('DetailsWorkorderComponent', () => {
  let component: DetailsWorkorderComponent;
  let fixture: ComponentFixture<DetailsWorkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWorkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
