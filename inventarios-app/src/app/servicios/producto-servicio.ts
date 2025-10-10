import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicio {
  private apiUrl = 'http://localhost:8080/inventarios-app'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) {}

  obtenerProductosLista(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}`);
  }
}