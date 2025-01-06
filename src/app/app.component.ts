import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookModel } from './models/book-model';
import { BookService } from './services/data.service';
import { BookDetailsComponent } from "./bookDetails/bookDetails.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  books: BookModel[] = [];
  new: BookModel | undefined= undefined;
  modify: BookModel | undefined = undefined;

  constructor(private dataService: BookService) {}

  ngOnInit() {
    this.dataService.getBooks().subscribe({
      next: (data: BookModel[]) => {
        this.books = data
      },
      error: (error: any) => console.error(error)
    });
  }

  createNew() {
    this.new = {
      id: null,
      title: '',
      author: '',
      genre: '',
      publishedDate: '',
      rating: 0
    }
  }

  doModify(model: BookModel) {
    this.modify = JSON.parse(JSON.stringify(model));
  }

  save(model: BookModel) {
    if (this.new != undefined) {
      this.dataService.addBook(model).subscribe({
        next: (data: BookModel) => {
          this.books.push(data);
          this.new = undefined;
        },
        error: (error: any) => console.error(error)
      });
    }
    else {
      this.dataService.modifyBook(model).subscribe({
        next: (data: BookModel) => {
          const index = this.books.findIndex((r) => r.id === data.id);
          this.books[index] = data;
          this.modify = undefined;
        },
        error: (error: any) => console.error(error)
      });
    }
  }

  doDelete(model: BookModel) {
    if (model.id) {
      this.dataService.deleteBook(model.id).subscribe({
        next: (data: BookModel) => {
          const index = this.books.findIndex((r) => r.id === data.id);
          this.books.splice(index, 1);
        },
        error: (error: any) => console.error(error)
      });
    }
  }
}
