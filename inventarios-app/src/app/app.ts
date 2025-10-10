import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto } from './model/producto.model';
import { ProductoLista } from './producto-lista/producto-lista';

@Component({
  selector: 'app-root',
  imports: [ProductoLista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inventarios-app');
}
