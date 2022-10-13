<?php 
class Productos extends Controller{
    public function __construct()
    {
        session_start();
        parent::__construct();    
    }

    public function index()
    {
        if(empty($_SESSION['activo'])){
            header("location: ".base_url);
        }
        $data['medidas'] = $this->model->getMedidas();
        $data['categorias'] = $this->model->getCategorias();
        $this->views->getView($this, "index", $data);
    }
    public function listar(){
        $data = ($this->model->getProductos());
        for ($i=0; $i < count($data); $i++) {
            if ($data[$i]['estado'] == 1){
                $data[$i]['estado'] = '<span class="badge bg-success">Activo</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-primary" type="button" onclick="btnEditarPro('.$data[$i]['id'].');"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger" type="button" onclick="btnEliminarPro('.$data[$i]['id'].');"><i class="fas fa-trash-alt"></i></button>      
                </div>';
            } else {
                $data[$i]['estado'] = '<span class="badge bg-danger">Inactivo</span>';
                $data[$i]['acciones'] = '<div>
                <button class="btn btn-success" type="button" onclick="btnReingresarPro('.$data[$i]['id'].');"><i class="fa-solid fa-arrow-rotate-left"></i></button>      
                </div>';
            } 
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function registrar()
    {
        $codigo   = $_POST['codigo'];
        $nombre    = $_POST['nombre'];
        $precio_compra = $_POST['precio_compra'];
        $precio_venta = $_POST['precio_venta'];
        $medida      = $_POST['medida'];
        $categoria        = $_POST['categoria'];
        $id = $_POST['id'];
        if(empty($codigo) || empty($nombre) || empty($precio_compra) || empty($precio_venta)){
            $msg = "Todo los campos son obligatorios";
        }else{
            if($id == ""){
                $data = $this->model->registrarProducto($codigo, $nombre, $precio_compra, $precio_venta, $medida, $categoria);
                if($data == "ok"){
                    $msg = "si";
                }else if($data == "existe"){
                    $msg = "El Producto ya existe";
                }else {
                    $msg = "Error al registrar el Producto";
                }
                
            }else{
                $data = $this->model->modificarProducto($codigo, $nombre, $precio_compra, $precio_venta, $medida, $categoria, $id);
                if($data == "modificado"){
                    $msg = "modificado";
                }else {
                    $msg = "Error al modificar el Producto";
                }
            }
            echo json_encode($msg, JSON_UNESCAPED_UNICODE);
            die();
        }
    }

    public function editar(int $id)
    {
        $data = $this->model->editarPro($id);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function eliminar(int $id)
    {   
        $data = $this->model->accionPro(0, $id);
        if($data == 1){
            $msg = "ok";
        }else {
            $msg = "Error al eliminar el Producto";
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function reingresar(int $id)
    {
        $data = $this->model->accionPro(1, $id);
        if($data == 1){
            $msg = "ok";
        }else {
            $msg = "Error al reingresar el Producto";
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
}
?>