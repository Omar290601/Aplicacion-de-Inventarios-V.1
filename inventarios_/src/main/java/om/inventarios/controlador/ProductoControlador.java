package om.inventarios.controlador;

import om.inventarios.modelo.Producto;
import om.inventarios.servicio.IProductoServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("inventarios-app") // Ruta base para todos los endpoints de inventario http://localhost:8080/inventario-app

public class ProductoControlador {

    private final IProductoServicio productoServicio;
    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    public ProductoControlador(IProductoServicio productoServicio) {
        this.productoServicio = productoServicio;
    }

    //  Listar todos los productos
    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoServicio.listarProductos();
        logger.info("Listado de productos obtenido, total: {}", productos.size());
        productos.forEach(producto -> logger.info(producto.toString()));
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    // Buscar producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable("id") Integer idProducto) {
        Producto producto = productoServicio.buscarProductoPorId(idProducto);
        if (producto != null) {
            return new ResponseEntity<>(producto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear nuevo producto
    @PostMapping
    public ResponseEntity<Producto> guardarProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoServicio.guardarProducto(producto);
        return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
    }

    // Actualizar producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable("id") Integer idProducto,
            @RequestBody Producto productoActualizado) {

        Producto productoExistente = productoServicio.buscarProductoPorId(idProducto);
        if (productoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productoExistente.setDescripcion(productoActualizado.getDescripcion());
        productoExistente.setPrecio(productoActualizado.getPrecio());
        productoExistente.setExistencia(productoActualizado.getExistencia());

        Producto productoGuardado = productoServicio.guardarProducto(productoExistente);
        return new ResponseEntity<>(productoGuardado, HttpStatus.OK);
    }

    //  Eliminar producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable("id") Integer idProducto) {
        Producto producto = productoServicio.buscarProductoPorId(idProducto);
        if (producto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productoServicio.eliminarProductoPorId(idProducto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
}
