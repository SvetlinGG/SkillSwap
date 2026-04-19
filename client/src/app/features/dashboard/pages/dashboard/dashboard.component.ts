
import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkillsService } from '../../../skills/services/skills.service';
import { AuthService } from '../../../auth/auth.service';
import { Skill } from '../../../skills/models/skill.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private skillsService: SkillsService, 
    private authService: AuthService
  ){}

  mySkills = signal<Skill[]>([]);
  isLoading = signal(true);

  userEmail = computed(() => this.authService.user()?.email || 'User');
  totalSkills = computed(() => this.mySkills().length);
  latestSkills = computed(() => this.mySkills().slice(0, 3));


  ngOnInit(): void {
    this.skillsService.getMySkills().subscribe({
      next: (skills) => {
        this.mySkills.set(skills);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
