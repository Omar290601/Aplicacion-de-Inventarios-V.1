import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicio {
  private apiUrl = 'http://localhost:8080/inventarios-app'; // ✅ CAMBIO: Quité /productos

  constructor(private http: HttpClient) {}

  obtenerProductosLista(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
  obtenerProductoPorId(id: number): Observable<Producto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Producto>(url);
  }
  editarProducto(id: number, producto: Producto): Observable<Object> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Producto>(url, producto);
  }
  eliminarProducto(id: number): Observable<Object> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
