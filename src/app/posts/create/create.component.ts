import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form = this.formBuilder.group({
    title: this.formBuilder.control('title'),
    description: this.formBuilder.control('desc'),
    body: this.formBuilder.control('body'),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
      this.formBuilder.control('JavaScript')
    ])
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.form.controls.
    // this.form.controls.tags.controls
    // this.form.addControl('test', );
  }

  addTag(tag: string) {
    this.form.controls.tags.push(
      this.formBuilder.control(tag)
    );

    // (this.form.get('tags') as FormArray).push()
  }

  removeTag(index: number){
    this.form.controls.tags.removeAt(index);
  }

}
