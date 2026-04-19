import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-skill-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './skill-create.component.html',
  styleUrl: './skill-create.component.css'
})
export class SkillCreateComponent {

  skill = {
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
  };
  constructor( 
    private skillsService: SkillsService, 
    private router: Router
  ) {}

  submit(): void{
    this.skillsService.createSkill(this.skill as any).subscribe({
      next: (createdSkill) => {
        this.router.navigate(['/skills', createdSkill._id]);
      },
      error: (err) => alert(err.error?.message || 'Failed to create skill')
    });
  }
}
