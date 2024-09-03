import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../share/global.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  allOrder: any;
  token: any;
  userRole: any;
  venderId: any;
  constructor(private global: GlobalService, private toastr: ToastrService, private router: Router) {}
  ngOnInit(): void {
    this.token = this.global.getToken();
    this.userRole = this.global.getUserData().role;
    this.venderId = this.global.getUserData()._id;
    if (this.userRole === 'admin') {
      this.global.getWithToken('order', this.token).subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.allOrder = res.data;
        },
        error: (err: any) => {
          console.log(err);
          this.expireSession(err.error.message)
        },
      });
    } else {
      this.global.getWithToken(`order/vender/${this.venderId}`, this.token).subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.allOrder = res.data;
        },
        error: (err: any) => {
          console.log(err);
          this.expireSession(err.error.message)
        },
      });
    }
  }

  deleteOrder(id:any){
    this.global.deleteWithToken(`order/${id}`, this.token).subscribe({
      next:(value:any)=> {
        this.toastr.success(value.message, "Success")
      },
      error:(err:any)=>{
        this.toastr.error(err.error.message, "Error")
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
