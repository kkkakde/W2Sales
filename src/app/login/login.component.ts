import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public ResultMsg = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }
  ngOnInit() {
    this.spinner.show();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
      data => {
        console.log(JSON.stringify(data));
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.ResultMsg = true;
        this.loginForm.get('username').setValue('');
        this.loginForm.get('password').setValue('');
        this.loading = false;
      });
  }
}
