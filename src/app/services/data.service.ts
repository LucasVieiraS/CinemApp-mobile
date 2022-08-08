import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any = [];

  constructor() { }

  setDados(index: string, data: any): boolean {
    if (index) {
      this.data[index] = data;
      return true;
    }
    return false;
  }

  getDados(index: string): any {
    if (index) {
      return this.data[index];
    }
    return null;
  }

  removeDados(index: string): boolean {
    return delete this.data[index];
  }
}