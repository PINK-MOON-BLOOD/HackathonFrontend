import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassword1Component } from './new-password1.component';

describe('NewPassword1Component', () => {
  let component: NewPassword1Component;
  let fixture: ComponentFixture<NewPassword1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassword1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPassword1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
