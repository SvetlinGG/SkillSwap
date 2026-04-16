import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-details.component.html',
  styleUrl: './skill-details.component.css'
})
export class SkillDetailsComponent implements OnInit {

  skill: any;

  constructor( private route: ActivatedRoute, private skillsService: SkillsService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.skillsService.getSkillById(id).subscribe(data => {
      this.skill = data;
    });
  }

}
