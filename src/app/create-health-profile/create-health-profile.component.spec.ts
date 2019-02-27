import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHealthProfileComponent } from './create-health-profile.component';

describe('CreateHealthProfileComponent', () => {
  let component: CreateHealthProfileComponent;
  let fixture: ComponentFixture<CreateHealthProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHealthProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHealthProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
