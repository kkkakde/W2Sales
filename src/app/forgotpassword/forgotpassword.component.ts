import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { $ } from 'protractor';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotpasswordForm: FormGroup;
  submitted = false;
  loading = false;
  ResultMsg = '';
  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({

      EmailID: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }
  get f() { return this.forgotpasswordForm.controls; }
  ForgotPassword() {
    this.loading = true;
    this.submitted = true;
    if (this.forgotpasswordForm.invalid) {
      this.loading = false;
      return;
    }
    this.authenticationService.ForgotPassword(this.f.EmailID.value)
    .subscribe(
    data => {
      if (data === 'true') {
        this.ResultMsg = 'Password send your register mail id';
        this.loading = false;
        this.router.navigate(['/login']);
      } else {
        this.ResultMsg = 'Invalid Mail ID';
        this.loading = false;
      }
    },
    error => {
      this.ResultMsg = 'Invalid User';
      this.loading = false;
      this.router.navigate(['/forgotpassword']);
    });

  }
  CancelPass() {
    this.router.navigate(['/login']);
  }
}
