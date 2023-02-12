import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProductUpdate } from './model/admin-product-update';
import { UploadResponse } from './model/upload-response';

@Injectable({
  providedIn: 'root'
})
export class AdminProductUpdateService {
  
  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<AdminProductUpdate> {
    return this.http.get<AdminProductUpdate>("/api/admin/products/" + id);
  }

  savePost(id: number, value: AdminProductUpdate) {
    return this.http.put<AdminProductUpdate>("/api/admin/products/" + id, value);
  }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("/api/admin/products/upload-image", formData);
  }
}
