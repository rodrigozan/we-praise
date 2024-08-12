import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScaleComponent } from './edit-scale.component';

describe('EditScaleComponent', () => {
  let component: EditScaleComponent;
  let fixture: ComponentFixture<EditScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditScaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
