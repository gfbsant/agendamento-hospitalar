import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarAgendamentoComponent } from './cancelar-agendamento.component';

describe('CancelarAgendamentoComponent', () => {
  let component: CancelarAgendamentoComponent;
  let fixture: ComponentFixture<CancelarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarAgendamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
