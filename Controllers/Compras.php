<?php 

class Compras extends Controller {
    public function __construct()
    {
        session_start();
        parent::__construct();
    }
    public function index()
    {
        $this->views->getView($this, "index");
    }
    public function buscarCodigo($cod)
    {
        $data = $this->model->getProCod($cod);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function ingresar()
    {
        $id = $_POST['id'];
        $datos = $this->model->getProductos($id);
        $id_producto = $datos['id'];
        $id_usuario = $_SESSION['id_usuario'];
        $precio = $datos['precio_compra'];
        $cantidad = $_POST['cantidad'];
        $comprobar = $this->model->consultarDetalle($id_producto, $id_usuario);
        if (empty($comprobar)){
            $sub_total = $precio * $cantidad;
            $data = $this->model->registrarDetalle($id_producto, $id_usuario, $precio, $cantidad, $sub_total);
            if ( $data == "ok"){
                $msg = "ok";
            }else{
                $msg = "Error al ingresar el producto";
            }
        }else {
            $total_cantidad = $comprobar['cantidad']+$cantidad;
            $sub_total = $total_cantidad * $precio;
            $data = $this->model->actualizarDetalle($precio, $total_cantidad, $sub_total, $id_producto, $id_usuario);
            if ( $data == "modificado"){
                $msg = "modificado";
            }else{
                $msg = "error al modificar el producto";
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function listar()
    {
        $id_usuario = $_SESSION['id_usuario'];
        $data['detalle'] = $this->model->getDetalle($id_usuario);
        $data['total_pagar'] = $this->model->calcularCompra($id_usuario);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function delete($id)
    {
        $data = $this->model->deleteDetalle($id);
        if ($data == 'ok'){
            $msg = 'ok';
        }else {
            $msg = 'Error';
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
    public function registrarCompra()
    {
        $id_usuario = $_SESSION['id_usuario'];
        $total = $this->model->calcularCompra($id_usuario);
        $data = $this->model->registrarCompra($total['total']);
        if ($data == 'ok') {
            $msg = 'ok';
        }else {
            $msg = 'Error al realizar la compra';
        }
        echo json_encode($msg);
        die();
    }
}

?>