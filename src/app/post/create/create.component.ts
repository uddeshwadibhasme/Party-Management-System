import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../header/header.component'
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HeaderComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      company_name: new FormControl('', Validators.required),
      mobile_no: new FormControl('', [Validators.required]),
      telephone_no: new FormControl(''),
      whatsapp_no: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.email),
      address: new FormControl('', Validators.required),
      bankdetails: new FormControl('', Validators.required),
      remark: new FormControl('', Validators.required),
      date_of_birth: new FormControl('', Validators.required),
      anniversary_date: new FormControl('', Validators.required),
      gstin: new FormControl('', Validators.required),
      pan_no: new FormControl('', Validators.required),
      apply_tds: new FormControl(false),
      credit_limit: new FormControl('', Validators.required)
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      alert('Vender created successfully!');
      this.router.navigateByUrl('post/index');
    })
  }

}
