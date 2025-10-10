package om.inventarios.servicio;

import om.inventarios.modelo.Producto;
import om.inventarios.repositorio.ProductoRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ProductoServicio implements IProductoServicio {

    private final ProductoRepositorio productoRepositorio;

    public ProductoServicio(ProductoRepositorio productoRepositorio) {
        this.productoRepositorio = productoRepositorio;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> listarProductos() {
        return productoRepositorio.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Producto buscarProductoPorId(Integer idProducto) {
        return productoRepositorio.findById(idProducto).orElse(null);
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return productoRepositorio.save(producto);
    }

    @Override
    public void eliminarProductoPorId(Integer idProducto) {
        if (!productoRepositorio.existsById(idProducto)) {
            throw new NoSuchElementException("No existe producto con id: " + idProducto);
        }
        productoRepositorio.deleteById(idProducto);
    }
}