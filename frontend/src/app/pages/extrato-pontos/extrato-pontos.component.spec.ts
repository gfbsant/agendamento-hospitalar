import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoPontosComponent } from './extrato-pontos.component';

describe('ExtratoPontosComponent', () => {
  let component: ExtratoPontosComponent;
  let fixture: ComponentFixture<ExtratoPontosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtratoPontosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtratoPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
