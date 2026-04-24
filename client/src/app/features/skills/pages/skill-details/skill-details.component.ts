
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.model';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-skill-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './skill-details.component.html',
  styleUrl: './skill-details.component.css'
})
export class SkillDetailsComponent implements OnInit  {

  // private route = inject(ActivatedRoute);
  // private router = inject(Router);
  // private skillsService = inject(SkillsService);
  // private authService = inject(AuthService);

  skill = signal<Skill | null>(null);
  isLoading = signal(true);

  isOwner = computed(() => {
    const currentUserId = this.authService.getCurrentUserId();
    const currentSkill = this.skill();
    const owner = currentSkill?.owner as any;
    const ownerId = typeof owner === 'object' ? owner?._id : owner;
    return !!currentUserId && !!ownerId && ownerId.toString() === currentUserId.toString();
  });

  isLiked = computed(() => {
    const currentUserId = this.authService.getCurrentUserId();
    return !!currentUserId && (this.skill()?.likes?.includes(currentUserId) ?? false);
  });

  likesCount = computed(() => this.skill()?.likes?.length ?? 0);

  ownerDisplayName = computed(() => {
    const owner = this.skill()?.owner;
    return owner && typeof owner === 'object' ? owner.username : 'Unknown';
  });

  constructor( 
    private route: ActivatedRoute, 
    private router: Router,
    private skillsService: SkillsService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    if (!id){
      this.router.navigate(['/skills']);
      return;
    }

    this.skillsService.getSkillById(id).subscribe({
      next: (data) =>{
      this.skill.set(data);
      this.isLoading.set(false);
      },
      error: () => this.router.navigate(['/skills'])
    });
  }

  onLike(): void {
    const currentSkill = this.skill();
    if (!currentSkill?._id) return;

    this.skillsService.likeSkill(currentSkill._id).subscribe({
      next: (updated) => this.skill.set(updated),
      error: (err) => alert(err?.error?.message || 'Failed to like skill')
    });
  }

  onDelete(): void{
    const currentSkill = this.skill();

    if(!currentSkill?._id){
      return
    }

    const hasConfirmed = confirm(`Delete "${currentSkill.title}"?`);

    if (!hasConfirmed){
      return;
    }

    this.skillsService.deleteSkill(currentSkill._id).subscribe({
      next: () => this.router.navigate(['/skills']),
      error: (err) => alert(err?.error?.message || 'Failed to delete skill')
      
    });
  }

}
