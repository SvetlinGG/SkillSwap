import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({providedIn: 'root'})
export class SkillsService {
  
  private apiUrl = 'http://localhost:5000/api/skills'

  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get<Skill[]>(this.apiUrl);
  }

  getSkillById(id: string) {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  createSkill(skill: Skill){
    return this.http.post<Skill>(this.apiUrl, skill)
  }
}
