<?php 

class ClientesModel extends Query{

    private $rut;
    private $nombre;
    private $direccion;
    private $telefono;
    private $id;
    private $estado;

    public function __construct()
    {
        parent::__construct();
    }
    public function getClientes()
    {
        $sql = "SELECT * FROM clientes";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarCliente(int $rut, string $nombre, string $direccion, int $telefono)
    {
        $this->rut = $rut;
        $this->nombre  = $nombre;
        $this->direccion   = $direccion;
        $this->telefono = $telefono;
        $verificar = "SELECT * FROM clientes WHERE rut = '$this->rut'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO clientes(rut,nombre,direccion,telefono) VALUES(?,?,?,?)";
            $datos = array($this->rut, $this->nombre, $this->direccion, $this->telefono,);
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
    public function editarCli( int $id)
    {
        $sql = "SELECT * FROM clientes WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function modificarCLiente(string $rut, string $nombre, string $telefono, string $direccion, int $id)
    {
        $this->usuario = $rut;
        $this->nombre  = $nombre;
        $this->telefono = $telefono;
        $this->direccion = $direccion;
        $this->id      = $id;
        $sql = "UPDATE clientes SET rut = ?, nombre = ?, telefono = ?, direccion = ?, id = ? WHERE id = $id";
        $datos = array($this->usuario, $this->nombre, $this->telefono, $this->direccion, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificado";
        }else{
            $res = "error";
        }
        return $res;
    }
    public function accionClient(int $estado, int $id)
    {
        $this->id     = $id;
        $this->estado = $estado;
        $sql          = "UPDATE clientes SET estado = ?, id = ? WHERE id = $id";
        $datos        = array($this->estado, $this->id);
        $data         = $this->save($sql, $datos);
        return $data; 
    }
}
?>