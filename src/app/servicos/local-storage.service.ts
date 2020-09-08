import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private localStorage:LocalStorage) { }

  setItem(key, value) {
    this.localStorage.setItem(key, value);
  }

  getItem(key) {
    return this.localStorage.getItem(key);
  }

  removeItem(key) {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }

  getLength() {
    return this.localStorage.length;
  }
}
