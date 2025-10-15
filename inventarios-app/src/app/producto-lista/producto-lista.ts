import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../model/producto.model';
import { ProductoServicio } from '../servicios/producto-servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.html',
  styleUrls: ['./producto-lista.css'] 

})
export class ProductoLista implements OnInit {
  productos: Producto[] = [];
  private productoServicio = inject(ProductoServicio);
  private enroutador = inject(Router);

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
  editarProducto(id: number) {
    this.enroutador.navigate(['/editar-producto', id]);
  }
   eliminarProducto(id: number){
    this.productoServicio.eliminarProducto(id).subscribe({
      next: (datos) => this.obtenerProductos(),
      error: (error) => console.log('Error al eliminar producto: ', error)
    });
  }
}