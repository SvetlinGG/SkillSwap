import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Skill } from '../../models/skill.model';

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


  ngOnInit(): void {
    
  }

  submit(){
    
  }

}
