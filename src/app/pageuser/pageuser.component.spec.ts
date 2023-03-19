import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageuserComponent } from './pageuser.component';

describe('PageuserComponent', () => {
  let component: PageuserComponent;
  let fixture: ComponentFixture<PageuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
