import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookModel } from '../models/book-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'http://localhost:3000/books'

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(this.url);
  }

  addBook(model: BookModel): Observable<BookModel>{
    return this.http.post<BookModel>(this.url, model);
  }

  modifyBook(model: BookModel): Observable<BookModel>{
    return this.http.put<BookModel>(`${this.url}/${model.id}`, model);
  }

  deleteBook(id: string): Observable<BookModel>{
    return this.http.delete<BookModel>(`${this.url}/${id}`);
  }
}
