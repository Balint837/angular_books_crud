import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../models/book-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookDetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookDetails.component.html',
  styleUrl: './bookDetails.component.css',
})
export class BookDetailsComponent {
  @Input() bookData: BookModel | undefined = undefined;
  @Output() canceled = new EventEmitter<void>();
  @Output() saved = new EventEmitter<BookModel>();
  isVisible: boolean = true;

  isClosing: boolean = false;

  closeModal() {
    this.isClosing = true;

    setTimeout(() => {
      this.isClosing = false;
      this.cancel();
    }, 190);
  }

  save() {
    this.isClosing = true;

    setTimeout(() => {
      this.isClosing = false;
      this.saved.emit(this.bookData);
    }, 185);
  }

  getvalue(event: any): string {
    return event.target.value;
  }

  getNumberValue(event: any): number {
    return Number(event.target.value);
  }

  cancel() {
    this.canceled.emit();
  }
}
