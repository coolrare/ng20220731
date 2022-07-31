import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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

  redirect = '/';

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.redirect = queryParamMap.get('redirect') || '/';
    })
  }

  login() {

    this.loginService.login(this.user).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('token', result.user.token);
        // this.router.navigate(['/']);
        this.router.navigateByUrl(this.redirect);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.error.body);
      }
    });

  }
}
