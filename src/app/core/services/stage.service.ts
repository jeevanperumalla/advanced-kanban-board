import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stage } from 'src/app/shared/models/stage.model';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private baseUrl = 'http://localhost:3000/stages';

  constructor(private http: HttpClient) {}

  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.baseUrl);
  }
}
