import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContentAdminComponent } from './left-content-admin.component';

describe('LeftContentAdminComponent', () => {
  let component: LeftContentAdminComponent;
  let fixture: ComponentFixture<LeftContentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftContentAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftContentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
