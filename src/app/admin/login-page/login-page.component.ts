import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IUser} from '../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'пожалуйста авторизуйтесь!';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)])
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.logIn(user).subscribe(() => {
      this.form.reset();
      this. router.navigate(['/admin', 'dashboard']);
    });
  }
}
