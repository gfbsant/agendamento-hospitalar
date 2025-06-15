import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioHomeComponent } from './funcionario-home.component';

describe('FuncionarioHomeComponent', () => {
  let component: FuncionarioHomeComponent;
  let fixture: ComponentFixture<FuncionarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
