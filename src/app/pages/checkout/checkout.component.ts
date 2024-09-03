import { Component } from '@angular/core';
import { GlobalService } from '../../share/global.service';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkOutForm: any;
  allWishlist: any = [];
  token: any;
  userData: any;
  getUserId: any;
  calulateAmount: any;
  itemIds: any[] = [];
  venderId: any[] = [];
  constructor(
    private global: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.token = this.global.getToken();
    this.userData = this.global.getUserData();
    this.getUserId = this.global.getUserData()._id;
    this.getWishList();

    this.checkOutForm = this.fb.group({
      customer: [this.getUserId, [Validators.required]],
      items: [this.itemIds, Validators.required],
      totalAmount: ['', Validators.required],
      status: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      vender_id: [this.venderId, Validators.required],
    });
  }

  getWishList() {
    this.global
      .getWithToken(`wishlist/${this.getUserId}`, this.token)
      .subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.allWishlist = res.data;
          this.getTotalAmount();
          this.extractItemIds();
          this.extractVenderIds();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  // calculate amount
  getTotalAmount() {
    this.calulateAmount = this.allWishlist.reduce(
      (total: any, item: any) => total + item.listItems.price,
      0
    );
  }

  //get ID
  extractItemIds(): void {
    this.allWishlist.forEach((item: any) => {
      if (item.listItems._id && !this.itemIds.includes(item.listItems._id)) {
        this.itemIds.push(item.listItems._id);
      }
    });

    console.log(this.itemIds); // Output the array of unique item IDs
  }

  //get ID
  extractVenderIds(): void {
    this.allWishlist.forEach((item: any) => {
      if (item.listItems.author_id && !this.venderId.includes(item.listItems.author_id)) {
        this.venderId.push(item.listItems.author_id);
      }
    });

    console.log(this.venderId); // Output the array of unique item IDs
  }

  //submit

  onSubmit(data: any) {
    if (
      (data.shippingAddress != '', data.status != '' && this.calulateAmount > 0)
    ) {
      console.log(data);

      this.global.postWithToken(data, 'order/add', this.token).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Place Order');
          this.router.navigate(['/bk/book']);
          this.checkOutForm.reset();
          if (res.code) {
            const resData = {
              customerId: this.getUserId,
            };
            this.global
              .postWithToken(resData, 'wishlist/deleteall', this.token)
              .subscribe({
                next(value) {
                  console.log(value);
                },
              });
          }
        },
        error: (err) => {
          this.toastr.success(err.error.message, 'Something Went Wrong');
        },
      });
    } else {
      this.toastr.warning('Fill all fields', 'Empty');
    }
  }


}
