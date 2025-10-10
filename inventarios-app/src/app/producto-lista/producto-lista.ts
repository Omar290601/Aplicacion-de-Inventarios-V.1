import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../model/producto.model';
import { ProductoServicio } from '../servicios/producto-servicio';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.html',
})
export class ProductoLista implements OnInit {
  productos: Producto[] = [];
  private productoServicio = inject(ProductoServicio);

  ngOnInit() {
    this.obtenerProductos();
  }

  private obtenerProductos(): void {
    this.productoServicio.obtenerProductosLista().subscribe({
      next: (datos) => {
        this.productos = datos;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }
}