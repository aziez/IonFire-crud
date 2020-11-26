import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formValidator: FormGroup;
  pesanError = ' ';
  pesanBerhasil = ' ';

  regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  pesanValidasi = {
    'email' : [
      {type: 'required', message: 'Email perlu di isi'},
      {type: 'pattern', message: 'Masukkan Email dengan Benar'}
    ],
    'password' : [
      {type: 'required', messages: 'Password harus diisi'},
      {type: 'minlength', message: 'Password harus lebih dari 5 huruf'}
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.formValidator = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.regex)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  tryRegister(value){
    this.authService.registerUser(value)
    .then(res => {
      console.log(res);
      this.pesanError = " ";
      this.pesanBerhasil = "AKun Berhasil Dibuat...";
    }, err => {
      console.log(err),
      this.pesanError = err.messages;
      this.pesanBerhasil = " ";
    })
  }
}
