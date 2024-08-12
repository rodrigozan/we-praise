import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScaleComponent } from './delete-scale.component';

describe('DeleteScaleComponent', () => {
  let component: DeleteScaleComponent;
  let fixture: ComponentFixture<DeleteScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteScaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
