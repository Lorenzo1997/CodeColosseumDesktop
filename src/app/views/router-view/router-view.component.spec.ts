import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterViewComponent } from './router-view.component';

describe('RouterViewComponent', () => {
  let component: RouterViewComponent;
  let fixture: ComponentFixture<RouterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});