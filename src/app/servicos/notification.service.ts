import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService<T> {
  constructor() { }

  subject: ReplaySubject<T> = new ReplaySubject();

  obs: Observable<T> = this.subject.asObservable();

  notify = (data: T) => {
    this.subject.next(data);
  }
}
