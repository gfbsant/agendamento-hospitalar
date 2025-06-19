import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraPontosComponent } from './compra-pontos.component';

describe('CompraPontosComponent', () => {
  let component: CompraPontosComponent;
  let fixture: ComponentFixture<CompraPontosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraPontosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
