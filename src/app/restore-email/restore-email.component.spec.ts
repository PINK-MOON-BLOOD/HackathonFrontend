import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreEmailComponent } from './restore-email.component';

describe('RestoreEmailComponent', () => {
  let component: RestoreEmailComponent;
  let fixture: ComponentFixture<RestoreEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestoreEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoreEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
