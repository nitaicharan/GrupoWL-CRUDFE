import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mt-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl(''),
    cpf: new FormControl('')
  })

  onSubmit() {
    console.log(this.form.value)
  }

  ngOnInit(): void { }
}
