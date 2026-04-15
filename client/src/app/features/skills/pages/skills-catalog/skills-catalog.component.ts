import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-catalog',
  standalone: true,
  imports: [],
  templateUrl: './skills-catalog.component.html',
  styleUrl: './skills-catalog.component.css'
})
export class SkillsCatalogComponent implements OnInit {

  skills: any[] = [];

  ngOnInit(): void {
    
  }

}
