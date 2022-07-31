import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {

    this.loginService.login(this.user).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('token', result.user.token);
        // this.router.navigate(['/']);
        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        alert(error.error.body);
      }
    });

  }
}
