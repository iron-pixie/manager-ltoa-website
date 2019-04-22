import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartManagerComponent } from './add-cart-manager.component';

describe('AddCartManagerComponent', () => {
  let component: AddCartManagerComponent;
  let fixture: ComponentFixture<AddCartManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCartManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
