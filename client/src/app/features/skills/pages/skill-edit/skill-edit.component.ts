
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsService } from '../../services/skills.service';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.css'
})
export class SkillEditComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private skillsService = inject(SkillsService);
  private authService = inject(AuthService);


  isLoading = signal(true);
  isSubmitting = signal(false);
  errorMessage = signal('');

  editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', [Validators.required]],
    level: ['Beginner', [Validators.required]]
  });

  get title(){
    return this.editForm.get('title');
  }
  get description(){
    return this.editForm.get('description');
  }
  get category(){
    return this.editForm.get('category');
  }
  get level(){
    return this.editForm.get('level');
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id){
      this.router.navigate(['/skills']);
      return;
    }

    this.skillsService.getSkillById(id).subscribe({
      next: (skill) => {
        const currentUserId = this.authService.getCurrentUserId();

        if (skill.owner !== currentUserId){
          this.router.navigate(['/skills', id]);
        }

        this.editForm.patchValue({
          title: skill.title,
          description: skill.description,
          category: skill.category,
          level: skill.level
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load skill');
        this.isLoading.set(false);
      }
    });
  }

  submit(): void{

    if(this.editForm.invalid){
      this.editForm.markAllAsTouched();
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (!id){
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const skillData = this.editForm.getRawValue();

    this.skillsService.updateSkill(id, {
      title: skillData.title || '',
      description: skillData.description || '',
      category: skillData.category || '',
      level: (skillData.level as 'Beginner' | 'Intermediate' | 'Advanced') || 'Beginner'
    }).subscribe({
      next: (updatedSkill) => {
        this.isSubmitting.set(false);
        this.router.navigate(['/skills', updatedSkill._id]);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to update skill')
      }
    });
  }
}
