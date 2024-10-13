import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndService {
  private baseUrl: string = 'https://www.dnd5eapi.co/api';

  constructor(private http: HttpClient) { }

  getRaces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/races`);
  }

  getRaceDetails(race: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/races/${race}`);
  }
  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`);
  }
  getClassDetails(classIndex: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes/${classIndex}`);
  }
}
