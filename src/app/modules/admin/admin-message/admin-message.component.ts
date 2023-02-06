import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminMessageService } from '../admin-message.service';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit, OnDestroy {

  messages: Array<string> = [];
  private clickCounter: number = 0;

  constructor(private adminMessagesService: AdminMessageService) { }

  ngOnInit(): void {
    this.adminMessagesService.subject.subscribe(messages => {
      this.messages = messages;
      this.timeoutColseMessages();
    });
  }

  clearMessages() {
    this.messages = [];
    this.adminMessagesService.clear();
  }

  ngOnDestroy(): void {
    this.adminMessagesService.subject.unsubscribe();
  }

  private timeoutColseMessages() {
    this.clickCounter++;
    setTimeout(() => {
      if (this.clickCounter == 1) {
        this.clearMessages();
      }
      this.clickCounter--;
    }, 12000);
  }
}
