import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'create-health-profile',
  templateUrl: './create-health-profile.component.html',
  styleUrls: ['./create-health-profile.component.css']
})
export class CreateHealthProfileComponent implements OnInit {
  healthForm: FormGroup;
  constructor(private fb : FormBuilder) {
    this.createHealthForm();
   }

  createHealthForm(){
    this.healthForm = this.fb.group({
      weight: ['', Validators.required],
      height: ['', Validators.required],
      sex: [1, Validators.required],
      age: [1, Validators.required],
    })
  }

  ngOnInit() {
  }

  onCreate(){
    
  }

}
