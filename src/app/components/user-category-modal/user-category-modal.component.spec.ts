import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoryModalComponent } from './user-category-modal.component';

describe('UserCategoryModalComponent', () => {
  let component: UserCategoryModalComponent;
  let fixture: ComponentFixture<UserCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
