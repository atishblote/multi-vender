import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../share/global.service';
import { DatePipe } from '@angular/common';

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
  constructor(private global: GlobalService) {}
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
        },
      });
    }
  }
}
