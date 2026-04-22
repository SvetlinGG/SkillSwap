import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { catchError, map, Observable, throwError } from 'rxjs';



@Injectable({providedIn: 'root'})
export class SkillsService {
  
  private apiUrl = 'http://127.0.0.1:5050/api/skills'

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.apiUrl).pipe(
      map((skills) => skills.sort((a, b) =>
      (b.createdAt || '').localeCompare(a.createdAt || '')
    )),
    catchError((error) => {
      console.error('GET SKILLS ERROR:', error);
      return throwError(() => new Error('Failed to load skills.'))
    })
    );
  }

  getMySkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/my-skills`).pipe(
      map((skills) => skills.filter(skill => !!skill._id)),
      catchError((error) => {
        console.error('GET MY SKILLS ERROR:', error);
        return throwError(() => new Error('Failed to load your skills.'))
      })
    );
  }

  getSkillById(id: string): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('GET SKILL DETAILS ERROR:', error);
        return throwError(() => new Error('Failed to load skill details.'))
      })
    );
  }

  createSkill(skillData: Omit<Skill, '_id' | 'owner' | 'createdAt' | 'updatedAt'>): Observable<Skill>{
    return this.http.post<Skill>(this.apiUrl, skillData).pipe(
      catchError((error) => {
        console.error('CREATE SKILL ERROR:', error);
        return throwError(() => new Error(error?.error?.message || 'Failed to create skill'))
      })
    );
  }

  updateSkill(id: string, skillData: Partial<Skill>): Observable<Skill>{
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skillData).pipe(
      catchError((error) => {
        console.error('UPDATE SKILL ERROR:', error);
        return throwError(() => new Error(error?.error?.message || 'Failed to update skill.'));
      })
    );
  }

  deleteSkill(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('DELETE SKILL ERROR:', error);
        return throwError(() => new Error(error?.error?.message || 'Failed to delete skill.'));
      })
      
    );
  }
}
