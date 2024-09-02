import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalService } from '../../share/global.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loaded:boolean = false

  constructor(private formBuilder: FormBuilder, private global:GlobalService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['atishlote@gmail.com', [Validators.required, Validators.email]],
      password: ['Atish@1234', Validators.required],
    });
  }

  onSubmit(data:any){
    console.log(data)
    this.global.postWithoutToken(data,"user/login").subscribe({
      next: (res:any)=>{
        console.log(res)
        if(res.code){
          this.toastr.success(res.message,"Success")
          this.global.setToken(res.token)
          this.global.storeUserData(res.user_data[0]); 
          this.router.navigate(['bk'])
          this.loaded= false
        }else{
          this.toastr.warning(res.message,"Error")
            
          }
      },
      error: (error)=>{
        this.toastr.error(error.error.message,"Success")
        console.log(error)
      }
    })
  }
}
