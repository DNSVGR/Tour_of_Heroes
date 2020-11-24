import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AttackTypesComponent } from './attack-types.component';

describe('AttackTypesComponent', () => {
  let component: AttackTypesComponent;
  let fixture: ComponentFixture<AttackTypesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttackTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
