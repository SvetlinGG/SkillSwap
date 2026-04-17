import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';



@Injectable({providedIn: 'root'})
export class SkillsService {
  
  private apiUrl = 'http://localhost:5000/api/skills'

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.apiUrl);
  }

  getSkillById(id: string): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  createSkill(skill: Skill): Observable<Skill>{
    return this.http.post<Skill>(this.apiUrl, skill)
  }

  updateSkill(id: string, skill: Skill): Observable<Skill>{
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill);
  }

  deleteSkill(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`)
  }
}
