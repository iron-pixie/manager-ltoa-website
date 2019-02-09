import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UilayerComponent } from './uilayer.component';

describe('UilayerComponent', () => {
  let component: UilayerComponent;
  let fixture: ComponentFixture<UilayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UilayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UilayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
