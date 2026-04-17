import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './skill-details.component.html',
  styleUrl: './skill-details.component.css'
})
export class SkillDetailsComponent implements OnInit {

  skill!: Skill;
  isLoading = true;

  constructor( 
    private route: ActivatedRoute, 
    private router: Router,
    private skillsService: SkillsService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    if (!id){
      this.router.navigate(['/skills']);
      return;
    }

    this.skillsService.getSkillById(id).subscribe({
      next: (data) =>{
      this.skill = data;
      this.isLoading = false;
      },
      error: () => this.router.navigate(['/skills'])
    });
  }

  onDelete(): void{
    const id = this.route.snapshot.paramMap.get('id');

    if(!id){
      return
    }

    const hasConfirmed = confirm(`Delete "${this.skill.title}"?`);

    if (!hasConfirmed){
      return;
    }

    this.skillsService.deleteSkill(id).subscribe({
      next: () => this.router.navigate(['/skills']),
      error: (err) => alert(err.error?.message || 'Failed to delete skill')
      
    });
  }

}
