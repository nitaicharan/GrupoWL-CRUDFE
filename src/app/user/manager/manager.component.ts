import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, take, catchError } from 'rxjs/operators';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  maxDate = new Date();
  minDate = new Date(1900, 0, 1);
  errorMessageField: string;

  form: FormGroup;

  title = 'Cadastro de novo usuário';

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.pattern('[a-zA-Z ]+'), Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(14)]],
      dataNascimento: ['', Validators.required],
      senha: ['', { disabled: true }],
      id: ['', { disabled: true }],
    });

    if (this.data) {
      this.title = 'Editar usuário';
      this.form.setValue(this.data);
    }
  }

  salvar(user: UserModel) {
    return this.service.addUser(user).pipe(
      tap(() => { this.dialogRef.close(); }),
      catchError((error: HttpErrorResponse) => {
        return this.errorMessageField = error.error.message;
      }),
      take(1)
    ).subscribe();
  }

  getErrorMessage(value: string): string {
    const errors: any = this.form.get(value).errors;
    if (!errors) { return ''; }
    if (errors.pattern) {
      return 'Caracteres(s) inválidos';
    }
    if (errors.required) {
      return 'Campo obrigatório';
    }
    if (errors.minlength && value === 'cpf') {
      return 'Campo CPF deve conter 11 dígitos';
    }
    return '';
  }
}
