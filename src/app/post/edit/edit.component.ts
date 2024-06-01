import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../header/header.component'
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators,FormsModule,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  id!: number;
  post!: Post;
  form!: FormGroup;
  data:any;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.data = data;
      this.form = this.formBuilder.group({
        name: [this.data.name],
        companyName: [this.data.company_name],
        mobileNo: [this.data.mobile_no],
        telephoneNo: [this.data.telephone_no],
        whatsappNo: [this.data.whatsapp_no],
        email: [this.data.email],
        remark: [this.data.remark],
        dateOfBirth: [this.data.date_of_birth],
        anniversaryDate: [this.data.anniversary_date],
        gstin: [this.data.gstin],
        panNo: [this.data.pan_no],
        applyTds: [this.data.apply_tds],
        creditLimit: [this.data.credit_limit],
        isActive: [this.data.is_active],
      });
      
    }); 
      
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
         alert('Data updated successfully!');
         this.router.navigateByUrl('post/index');
    })
  }

}
