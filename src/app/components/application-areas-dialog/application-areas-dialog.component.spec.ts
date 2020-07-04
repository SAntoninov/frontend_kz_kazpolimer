import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAreasDialogComponent } from './application-areas-dialog.component';

describe('ApplicationAreasDialogComponent', () => {
  let component: ApplicationAreasDialogComponent;
  let fixture: ComponentFixture<ApplicationAreasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationAreasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationAreasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
