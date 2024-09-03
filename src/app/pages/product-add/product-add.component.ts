import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../share/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  ProductForm:any
  token:any
  userId:any
  userName:any

  constructor(private  fb:FormBuilder, private  global:GlobalService,  private toastr: ToastrService, private router : Router){}

  ngOnInit(): void {
    this.token = this.global.getToken()
    this.userId = this.global.getUserData()._id
    this.userName = this.global.getUserData().full_name

    this.ProductForm = this.fb.group({
      title:["", [Validators.required]],
      image:["", [Validators.required]],
      author:[this.userName, [Validators.required]],
      publishedDate:["", [Validators.required]],
      summary:["", [Validators.required]],
      ISBN:["", [Validators.required]],
      language:["", [Validators.required]],
      publisher:["", [Validators.required]],
      price:["", [Validators.required]],
      stock:["", [Validators.required]],
      author_id:[this.userId, [Validators.required]],
    })
  }


  onSubmit(data:any){
    console.log(data)
    // if(!this.ProductForm.invalid){
      this.global.postWithToken(data, "book/add" , this.token).subscribe({
        next:(res:any)=>{
          this.toastr.success(res.message, "Success")
        },
        error:(err:any) => {
          this.toastr.error(err.error.message,  "Error")
          this.expireSession(err.error.message)
        },
      })
    }
  // }


  expireSession(message:any){
    if(message == "Session expired"){
      alert("Sesstion Is Expired Please login")
      this.global.logout()
      this.router.navigate(['login'])
    }
    
  }
}
