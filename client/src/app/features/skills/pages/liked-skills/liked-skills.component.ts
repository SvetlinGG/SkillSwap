import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-liked-skills',
  standalone: true,
  imports: [RouterLink, TruncatePipe],
  templateUrl: './liked-skills.component.html',
  styleUrl: './liked-skills.component.css'
})
export class LikedSkillsComponent implements OnInit {

  private skillsService = inject(SkillsService);

  likedSkills = signal<Skill[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.skillsService.getLikedSkills().subscribe({
      next: (skills) => {
        this.likedSkills.set(skills);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load liked skills.');
        this.isLoading.set(false);
      }
    });
  }
}
