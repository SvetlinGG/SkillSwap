
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkillsService } from '../../services/skills.service';
import { Skill } from '../../models/skill.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-skills-catalog',
  standalone: true,
  imports: [RouterLink, TruncatePipe],
  templateUrl: './skills-catalog.component.html',
  styleUrl: './skills-catalog.component.css'
})
export class SkillsCatalogComponent implements OnInit {

  skills: any[] = [];

  constructor(private skillsService: SkillsService){}

  ngOnInit() {
    this.skillsService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }

}
