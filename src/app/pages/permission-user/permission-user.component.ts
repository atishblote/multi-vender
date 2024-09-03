import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../share/global.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-permission-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './permission-user.component.html',
  styleUrl: './permission-user.component.css',
})
export class PermissionUserComponent implements OnInit {
  userData: any;
  userId: any;
  permissionFOrm: any;
  token: any;
  userEmail: any;
  updateId: any;
  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private global: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRouter.params.subscribe((params: any) => {
      this.userId = params['id'];
      this.token = this.global.getToken();
    });

    this.global
      .getWithToken(`permission/${this.userId}`, this.token)
      .subscribe({
        next: (res: any) => {
          this.userData = res.data;
          console.log(this.userData);
          this.updateId = this.userData?._id;
          this.userEmail = this.userData ? this.userData.email : '';
        },
        error: (err: any) => {
          console.log(err);
          this.expireSession(err.error.message)

        },
      });

    this.permissionFOrm = this.fb.group({
      user_id: [this.userId, [Validators.required]],
      email: [this.userEmail, [Validators.required]],
      read: [true, [Validators.required]],
      role: ['', [Validators.required]],
      write: [false, [Validators.required]],
      update: [false, [Validators.required]],
      delete: [false, [Validators.required]],
    });
  }

  onSubmit(data: any) {
    console.log(data);
    if (this.userData != undefined) {
      this.global
        .updateWithToken(data, `permission/update/${this.updateId}`, this.token)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(res.message, 'Permission');
          this.router.navigate(['/bk/users'])

          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
            this.expireSession(err.error.message)

          },
        });
    } else {
      this.global.postWithToken(data, `permission/add`, this.token).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Permission');
          this.router.navigate(['/bk/users'])

        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
          this.expireSession(err.error.message)

        },
      });
    }
    const is_active = {
      role: data.role
    };
    this.global
      .updateWithToken(is_active, `user/pardelete/${this.userId}`, this.token)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
          this.expireSession(err.error.message)

        },
      });
  }



  deleteUser(id:any){
    console.log(id)
    if(id != ' '){
      this.global.deleteWithToken(`user/${id}`, this.token).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Deleted');
          this.router.navigate(['bk/users'])
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
          this.expireSession(err.error.message)
        },
      })
    }
  }


  expireSession(message:any){
    if(message == "Session expired"){
      alert("Sesstion Is Expired Please login")
      this.global.logout()
      this.router.navigate(['login'])
    }
    
  }
}
