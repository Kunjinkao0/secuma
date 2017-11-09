import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtitleComponent } from './ftitle.component';

describe('FtitleComponent', () => {
  let component: FtitleComponent;
  let fixture: ComponentFixture<FtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
