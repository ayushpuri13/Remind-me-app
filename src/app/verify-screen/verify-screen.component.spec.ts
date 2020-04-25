import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyScreenComponent } from './verify-screen.component';

describe('VerifyScreenComponent', () => {
  let component: VerifyScreenComponent;
  let fixture: ComponentFixture<VerifyScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
