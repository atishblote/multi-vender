import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../share/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  allBooks: any;
  userId: any;
  constructor(private global: GlobalService, private toastr: ToastrService, private router: Router) {}
  token: any;
  ngOnInit(): void {
    this.token = this.global.getToken();
    this.userId = this.global.getUserData()._id

    this.global.getWithToken('book', this.token).subscribe({
      next: (res: any) => {
        this.allBooks = res.data;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  add_to_cart(productId: number) {
    const body = {
      customerId: this.userId,
      listItems: productId,
      productStatus: 'in-wishlist',
    };
    console.log(body)
    this.global.postWithToken(body, 'wishlist/add', this.token).subscribe({
      next: (res: any) => {
        this.toastr.success( res.message , "Added to Cart");
        if(res.code){
          this.router.navigate(['bk/checkout'])
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Error', err.error.message);
      },
    });
  }
}
