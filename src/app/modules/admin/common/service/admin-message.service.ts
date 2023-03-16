import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  messages: Array<string> = [];
  subject = new Subject<Array<string>>;

  constructor() { }

  add(message: string): void {
    this.clear();
    this.messages.push(message);
    this.subject.next(this.messages);
  }

  addSpringErrors(error: any): void {
    this.clear();
    this.extractMessages(error);
    this.subject.next(this.messages);
  }

  clear(): void {
    this.messages = [];
  }

  private extractMessages(error: any) {
  if (error.errors?.length > 0) {
      for (let message of error.errors) {
        this.messages.push("Field: " + message.field + " -> " + message.defaultMessage);
      }
    } else {
      this.messages.push(error.message);
    }
  }
}
