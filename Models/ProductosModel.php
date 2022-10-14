<?php 

class ProductosModel extends Query{

    private $codigo;
    private $nombre;
    private $precio_venta;
    private $precio_compra;
    private $id_medida;
    private $id_categoria;
    private $id;
    private $estado;
    private $img;
    public function __construct()
    {
        parent::__construct();
    }
    public function getProducto(string $Producto)
    {
        $sql = "SELECT * FROM Productos WHERE Producto = '$Producto'";
        $data = $this->select($sql);
        return $data;
    }
    public function getProductos()
    {
        $sql = "SELECT p. *, m.id AS id_medida, m.nombre AS medida, c.id AS id_categoria, c.nombre AS categoria FROM productos p INNER JOIN medidas m ON p.id_medida = m.id INNER JOIN categorias c ON p.id_categoria = c.id";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getMedidas()
    {
        $sql = "SELECT * FROM medidas where estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function getCategorias()
    {
        $sql = "SELECT * FROM categorias where estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }

    public function registrarProducto(string $codigo, string $nombre, int $precio_compra, int $precio_venta, int $id_medida, int $id_categoria, string $img)
    {
        $this->codigo = $codigo;
        $this->nombre  = $nombre;
        $this->precio_compra = $precio_compra;
        $this->precio_venta   = $precio_venta;
        $this->id_medida = $id_medida;
        $this->id_categoria = $id_categoria;
        $this->img = $img;
        $verificar = "SELECT * FROM productos WHERE codigo = '$this->codigo'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO productos(codigo,descripcion,precio_compra,precio_venta,id_medida,id_categoria,foto) VALUES(?,?,?,?,?,?,?)";
            $datos = array($this->codigo, $this->nombre, $this->precio_compra, $this->precio_venta, $this->id_medida, $this->id_categoria, $this->img);
            $data = $this->save($sql, $datos);
            if ($data == 1){
                $res = "ok";
            }else{
                $res = "Error";
            }
        }else {
            $res = "existe";
        }

        return $res;
    }
    public function editarPro( int $id)
    {
        $sql = "SELECT * FROM productos WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function modificarPro(string $codigo, string $nombre, int $precio_compra, int $precio_venta, int $id_medida, int $id_categoria, string $img, int $id)
    {
        $this->codigo = $codigo;
        $this->nombre  = $nombre;
        $this->precio_compra = $precio_compra;
        $this->precio_venta = $precio_venta;
        $this->id_medida = $id_medida;
        $this->id_categoria = $id_categoria;
        $this->img = $img;
        $this->id = $id;
        $sql = "UPDATE productos SET codigo = ?, descripcion = ?, precio_compra = ?, precio_venta = ?, id_medida = ?, id_categoria = ?, foto = ?, id = ? WHERE id = $id";
        $datos = array($this->codigo, $this->nombre, $this->precio_compra, $this->precio_venta, $this->id_medida, $this->id_categoria, $this->img, $this->id);
        $data = $this->save($sql, $datos); 
        if ($data == 1) {
            $res = "modificado";
        }else{
            $res = "error";
        }
        return $res;
    }

    public function accionPro(int $estado, int $id)
    {
        $this->id     = $id;
        $this->estado = $estado;
        $sql          = "UPDATE productos SET estado = ?, id = ? WHERE id = $id";
        $datos        = array($this->estado, $this->id);
        $data         = $this->save($sql, $datos);
        return $data; 
    }
}
?>