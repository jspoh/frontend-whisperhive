import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = fb.group({
      username: [{ value: '', disabled: false }, [Validators.required]],
      password: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let res: any;

    const serverRes = new Promise((resolve, reject) => {
      this.dataService
        .loginUser(this.loginForm.value)
        .pipe(map((response: any) => (res = response)))
        .subscribe({
          next(response) {
            // console.log(response);
            resolve('');
          },
          error(err) {
            // console.log(err);
            reject(err);
          },
          // complete() {
          //   console.log('complete');
          // },
        });
    });

    serverRes
      // if user is authenticated (successfully logged in)
      .then(() => {
        this.cookieService.put('session', res.cookie);
        this.router.navigate(['/feed']);
      })
      // if wrong username/email/password
      .catch((err) => {
        console.log(err);
      });
  }
}
