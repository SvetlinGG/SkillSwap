
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.css'
})
export class MySkillsComponent implements OnInit {

  constructor(private skillsService: SkillsService){}

  mySkills = signal<Skill[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.skillsService.getMySkills().subscribe({
      next: (skills) => {
        this.mySkills.set(skills);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Failed to load your skills');
        this.isLoading.set(false);
      }
    });
  }
}
