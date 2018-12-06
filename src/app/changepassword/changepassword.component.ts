import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordForm1: FormGroup;
  submitted = false;
  public session: any;
  loading = false;
  constructor(private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.session = {
      session: JSON.parse(localStorage.getItem('currentUser'))
    };
    this.changepasswordForm1 = this.formBuilder.group({
      curpass: ['', Validators.required],
      confpass: ['', Validators.required],
      newpwd: ['', Validators.required]
    });
  }
  get f() { return this.changepasswordForm1.controls; }

  ChangePassword() {
    this.submitted = true;
    this.loading = true;
    if (this.changepasswordForm1.invalid) {
      this.loading = false;
      return;
    }
    if (this.f.newpwd.value !== this.f.confpass.value) {
      alert('new password and confirm password does not match.');
      return;
    }
    let body = {
      Password: this.f.curpass.value,
      NewPassword: this.f.newpwd.value,
      ConfirmPassword: this.f.confpass.value,
      User_ID: this.session.session.PK_Resource_Id
    };
    this.authenticationService.ChangePassword(body)
    .subscribe(
    data => {
      if (data === 'true')
      {
        alert('Password changed Successfully..!');
        this.changepasswordForm1.get('curpass').setValue('');
        this.changepasswordForm1.get('confpass').setValue('');
        this.changepasswordForm1.get('newpwd').setValue('');
        this.loading = false;
        this.router.navigate(['/login']);
      }
      else
      {
        alert('Current password not correct..!');
      }
    },
    error => {
      alert('Invalid User');
      this.router.navigate(['/forgotpassword']);
      this.loading = false;
    });

  }

  cancelpass() {
    this.router.navigate(['/customerlist']);
  }
}
