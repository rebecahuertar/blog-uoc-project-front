import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryDTO } from '../Models/category.dto';
import { SharedService } from './shared.service';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'categories';
    this.urlBlogUocApi = 'http://localhost:3000/' + this.controller;
  }

  getCategoriesByUserId(userId: string): Observable<CategoryDTO[]> {
    return this.http
      .get<CategoryDTO[]>('http://localhost:3000/users/categories/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http
      .post<CategoryDTO>(this.urlBlogUocApi, category)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoryById(categoryId: string): Observable<CategoryDTO> {
    return this.http
      .get<CategoryDTO>(this.urlBlogUocApi + '/' + categoryId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCategory(
    categoryId: string,
    category: CategoryDTO
  ): Observable<CategoryDTO> {
    return this.http
      .put<CategoryDTO>(this.urlBlogUocApi + '/' + categoryId, category)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteCategory(categoryId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlBlogUocApi + '/' + categoryId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
