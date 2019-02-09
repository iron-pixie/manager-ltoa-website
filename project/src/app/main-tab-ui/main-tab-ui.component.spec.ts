import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTabUiComponent } from './main-tab-ui.component';

describe('MainTabUiComponent', () => {
  let component: MainTabUiComponent;
  let fixture: ComponentFixture<MainTabUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTabUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTabUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
