import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../share/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  name:any
  userId:any
  role:any
  token:any
  constructor(private global:GlobalService, private toaster : ToastrService, private router:Router){}
  ngOnInit(): void {
    this.token = this.global.getToken()
    this.name = this.global.getUserData().full_name
    this.userId = this.global.getUserData()._id
    this.role = this.global.getUserData().role
    // this.global.getWithToken(`permission/${this.userId}`, this.token).subscribe({
    //   next: (res:any)=>{
    //     console.log(res)
    //   }, error:(err:any)=>{
    //     console.log(err)
    //   }
    // })

  }

  logOut(){
    this.global.logout();
    this.toaster.success("Logout Successfuly" , "LOGOUT")
    this.router.navigate(['login'])
  }
}
