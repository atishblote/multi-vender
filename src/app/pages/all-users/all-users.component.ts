import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../share/global.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit{
    allUsers:any
    token:any
    userId:any
    constructor(private global: GlobalService, private router: Router){}
    ngOnInit(): void {
      this.token =  this.global.getToken()
      this.userId = this.global.getUserData()._id
  
      this.global.getWithToken('user',this.token).subscribe({
        next: (res:any)=>{
          console.log(res.data)
          this.allUsers = res.data
        },
        error: (err:any)=>{
          console.log(err)
          this.expireSession(err.error.message)
        }
      })
    }




    expireSession(message:any){
      if(message == "Session expired"){
        alert("Sesstion Is Expired Please login")
        this.global.logout()
        this.router.navigate(['login'])
      }
      
    }
}
