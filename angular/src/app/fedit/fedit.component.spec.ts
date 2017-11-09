import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeditComponent } from './fedit.component';

describe('FeditComponent', () => {
  let component: FeditComponent;
  let fixture: ComponentFixture<FeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
