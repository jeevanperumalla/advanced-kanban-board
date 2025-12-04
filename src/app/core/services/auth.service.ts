import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly SESSION_KEY = 'kanban_session';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.baseUrl}/users?username=${username}&password=${password}`).pipe(
      map(users => users.length ? users[0] : null),
      tap(user => {
        if (user) {
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user && user.role === 'admin';
  }
}
