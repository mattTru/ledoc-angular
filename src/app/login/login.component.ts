import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: '';
  password: '';
  form: FormGroup;
  hide = true;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.userService.connect(this.form.value).subscribe(response => {   
      this.tokenStorageService.setToken(response['access_token']);   
      this.router.navigate(['/dashboard']);
    })
  }
}
