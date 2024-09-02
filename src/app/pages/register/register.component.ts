import { Component } from '@angular/core';
import { FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,} from '@angular/forms';
import { GlobalService } from '../../share/global.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: any;
  loaded:boolean = false

  constructor(private formBuilder: FormBuilder, private global:GlobalService, private router: Router, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      full_name: ["", Validators.required],
      admin_email: ["", Validators.required],
      phone: ["", Validators.required],
      is_active: [true, Validators.required],
      isDeletedPartial: [false, Validators.required],
    });
  }

  onSubmit(data:any){
    console.log(data)
    this.global.postWithoutToken(data,"user/signup").subscribe({
      next: (res:any)=>{
        console.log(res)
        if(res.code){
        this.toastr.success(res.message,"Success")
          this.global.setToken(res.token)
          this.global.storeUserData(res.data); 
          this.router.navigate(['login'])
          this.loaded= false
        }
        this.loginForm.reset()
      },
      error: (error)=>{
        this.toastr.error(error.error.message,"Error")
        console.log(error)
        this.loginForm.reset()
      }
    })
  }
}
