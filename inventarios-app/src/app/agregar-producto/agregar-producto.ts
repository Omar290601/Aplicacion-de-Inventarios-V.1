import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../model/producto.model';
import { ProductoServicio } from '../servicios/producto-servicio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-producto',
  imports: [FormsModule],
  templateUrl: './agregar-producto.html',
})
export class AgregarProducto {
  producto : Producto = new Producto();

  private productoServicio= inject(ProductoServicio);
  private enrutador = inject(Router);

  onSubmit() {
    this.guardarProducto();
}
  guardarProducto() {
    this.productoServicio.agregarProducto(this.producto).subscribe({
    next:(datos) => this.irListaProductos(),
    error:(error) => console.log("Error al agregar producto: ", error)
  });
  }

  irListaProductos() {
    this.enrutador.navigate(['/productos']);
  }
  
}