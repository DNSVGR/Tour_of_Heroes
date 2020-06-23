import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackTypesComponent } from './attack-types.component';

describe('AttackTypesComponent', () => {
  let component: AttackTypesComponent;
  let fixture: ComponentFixture<AttackTypesComponent>;

  beforeEach(async(() => {
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
