import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentHomeComponent } from './resident-home.component';

describe('ResidentHomeComponent', () => {
  let component: ResidentHomeComponent;
  let fixture: ComponentFixture<ResidentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
