package om.inventarios.servicio;


import om.inventarios.modelo.Producto;

import java.util.List;

public interface IProductoServicio {

    List<Producto> listarProductos();

    Producto buscarProductoPorId(Integer idProducto);

    Producto guardarProducto(Producto producto);

    void eliminarProductoPorId(Integer idProducto);
}
