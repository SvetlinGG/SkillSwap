import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './skill-create.component.html',
  styleUrl: './skill-create.component.css'
})
export class SkillCreateComponent {

  skill: Skill = {
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    owner: 'temp-user-id'
  };
  constructor( 
    private skillsService: SkillsService, 
    private router: Router
  ) {}

  submit(){
    this.skillsService.createSkill(this.skill).subscribe({
      next: () => this.router.navigate(['/skills']),
      error: (err) => alert(err.error?.message || 'Failed to create skill')
    });
  }
}
