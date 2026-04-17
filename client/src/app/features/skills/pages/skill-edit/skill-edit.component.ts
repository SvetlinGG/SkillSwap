import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Skill } from '../../models/skill.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.css'
})
export class SkillEditComponent implements OnInit {

  skill: Skill = {
    title: '',
    description: '',
    category: '',
    level: 'Beginner',
    owner: ''
  };

  isLoading = true;

  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private skillsService: SkillsService
  ){}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id){
      this.router.navigate(['/skills']);
      return;
    }

    this.skillsService.getSkillById(id).subscribe({
      next: (data) => {
        this.skill = data;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/skills']);
      }
    });
  }

  submit(){
    const id = this.route.snapshot.paramMap.get('id');

    if (!id){
      return;
    }

    this.skillsService.updateSkill(id, this.skill).subscribe({
      next: (updatedSkill) => {
        this.router.navigate(['/skills', updatedSkill._id]);
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to update skill')
      }
    });
  }
}
