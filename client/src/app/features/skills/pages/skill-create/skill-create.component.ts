import { Component, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-skill-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './skill-create.component.html',
  styleUrl: './skill-create.component.css'
})
export class SkillCreateComponent {

  constructor( 
    private fb: FormBuilder,
    private skillsService: SkillsService, 
    private router: Router
  ) {}

  errorMessage = signal('');
  isSubmitting = signal(false);

  createForm = this.fb.control({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', [Validators.required]],
    level: ['Beginner', [Validators.required]]
  });

  get title(){
    return this.createForm.get('title');
  }
  get description(){
    return this.createForm.get('description');
  }
  get category(){
    return this.createForm.get('category');
  }
  get level(){
    return this.createForm.get('level');
  }


  submit(): void{

    if(this.createForm.invalid){
      this.createForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const skillData = this.createForm.getRawValue();


    this.skillsService.createSkill({
      title: skillData?.title || '',
      description: skillData?.description || '',
      category: skillData?.category || '',
      level: (skillData?.level as 'Beginner' | 'Intermediate' | 'Advanced') || 'Beginner'
    }).subscribe({
      next: (createdSkill) => {
        this.isSubmitting.set(false);
        this.router.navigate(['/skills', createdSkill._id]);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to create skill')
      }
    });
  }
}
