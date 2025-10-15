import { Component, inject } from '@angular/core';
import { Producto } from '../model/producto.model';
import { ProductoServicio } from '../servicios/producto-servicio';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  imports: [FormsModule],
  templateUrl: './editar-producto.html',
})
export class EditarProducto {
  id!: number;
  producto: Producto = new Producto();
  private ruta = inject(ActivatedRoute);
  private productoServicio = inject(ProductoServicio);
  private enrutador = inject(Router); 
  ngOnInit(){
    this.id = this.ruta.snapshot.params['id'];
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (datos) => this.producto = datos,
      error: (e) => console.error(e)
    });
  }

  onSubmit() {
    this.productoServicio.editarProducto(this.id, this.producto).subscribe({
      next: (datos) => {
        console.log(datos);
        alert("Producto actualizado con éxito.");
        this.irLalistaProductos();
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
        alert("Error al actualizar el producto.");
      }
    });
  }

  irLalistaProductos() {
    this.enrutador.navigate(['/productos']);
  }
}