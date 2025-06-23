import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConsultaService} from '../../../services/consulta.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-cadastro-consulta',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.css'
})
export class CadastroConsultaComponent implements OnInit {

  form!: FormGroup;
  mensagem = '';
  tipoMensagem = 'success';

  constructor(private fb: FormBuilder, private consultaService: ConsultaService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dataHora: ['', Validators.required],
      especialidade: ['', Validators.required],
      medico: ['', Validators.required],
      valor: [null, [Validators.min(0), Validators.required]],
      vagas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  cadastrar() {
    if (this.form.invalid) {
      this.mostrarMensagem("Preencha todos os campos corretamente!", 'danger');
    }

    this.consultaService.cadastrarConsulta(this.form.value).subscribe({
      next: () => {
        this.mostrarMensagem('Consulta cadastrada com sucesso!');
        this.form.reset();
        this.router.navigate(['/funcionario-home']);
      },
      error: err => {
        this.mostrarMensagem("Erro ao cadastrar consulta: " + err.error.msg);
      }
    })
  }

  mostrarMensagem(mensagem: string, tipoMensagem: string = 'success') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipoMensagem;
    if (tipoMensagem === 'success') {
      setTimeout(() => this.mensagem = '', 3000)
    }
  }

}
