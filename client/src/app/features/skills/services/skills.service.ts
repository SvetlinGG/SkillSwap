import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';



@Injectable({providedIn: 'root'})
export class SkillsService {
  
  private apiUrl = 'http://127.0.0.1:5050/api/skills'

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.apiUrl);
  }

  getMySkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/my-skills`)
  }

  getSkillById(id: string): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  createSkill(skillData: Omit<Skill, '_id' | 'owner' | 'createdAt' | 'updatedAt'>): Observable<Skill>{
    return this.http.post<Skill>(this.apiUrl, skillData)
  }

  updateSkill(id: string, skillData: Partial<Skill>): Observable<Skill>{
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skillData);
  }

  deleteSkill(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`)
  }
}
