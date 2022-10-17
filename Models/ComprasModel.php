<?php 

class ComprasModel extends Query{

    private $nombre;
    private $id;
    private $estado;

    public function __construct()
    {
        parent::__construct();
    }

    public function getCategorias()
    {
        $sql = "SELECT * FROM categorias";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarCategoria(string $nombre)
    {
        $this->nombre  = $nombre;
        $verificar = "SELECT * FROM categorias WHERE nombre = '$this->nombre'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO categorias(nombre) VALUES(?)";
            $datos = array($this->nombre);
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
    public function editarCat( int $id)
    {
        $sql = "SELECT * FROM categorias WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function modificarCategoria(string $Categoria, string $nombre, int $id_caja, int $id)
    {
        $this->nombre  = $nombre;
        $this->id      = $id;
        $sql = "UPDATE categorias SET nombre = ? WHERE id = $id";
        $datos = array($this->nombre, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificado";
        }else{
            $res = "error";
        }
        return $res;
    }
    public function accionCat(int $estado, int $id)
    {
        $this->id     = $id;
        $this->estado = $estado;
        $sql          = "UPDATE categorias SET estado = ?, id = ? WHERE id = $id";
        $datos        = array($this->estado, $this->id);
        $data         = $this->save($sql, $datos);
        return $data; 
    }
}
?>