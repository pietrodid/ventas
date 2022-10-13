<?php 

class CategoriasModel extends Query{

    private $Categoria;
    private $nombre;
    private $clave;
    private $id_caja;
    private $id;
    private $estado;

    public function __construct()
    {
        parent::__construct();
    }
    public function getCategoria(string $Categoria, string $clave)
    {
        $sql = "SELECT * FROM Categorias WHERE Categoria = '$Categoria' AND clave = '$clave' ";
        $data = $this->select($sql);
        return $data;
    }
    public function getCajas()
    {
        $sql = "SELECT * FROM caja where estado = 1";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function getCategorias()
    {
        $sql = "SELECT u.*, c.id as id_caja, c.caja FROM Categorias u INNER JOIN caja c WHERE u.id_caja = c.id";
        $data = $this->selectAll($sql);
        return $data;
    }
    public function registrarCategoria(string $Categoria, string $nombre, string $clave, int $id_caja)
    {
        $this->Categoria = $Categoria;
        $this->nombre  = $nombre;
        $this->clave   = $clave;
        $this->id_caja = $id_caja;
        $verificar = "SELECT * FROM Categorias WHERE Categoria = '$this->Categoria'";
        $existe = $this->select($verificar);
        if (empty($existe)) {
            $sql = "INSERT INTO Categorias(Categoria,nombre,clave,id_caja) VALUES(?,?,?,?)";
            $datos = array($this->Categoria, $this->nombre, $this->clave, $this->id_caja,);
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
    public function editarUser( int $id)
    {
        $sql = "SELECT * FROM Categorias WHERE id = $id";
        $data = $this->select($sql);
        return $data;
    }
    public function modificarCategoria(string $Categoria, string $nombre, int $id_caja, int $id)
    {
        $this->Categoria = $Categoria;
        $this->nombre  = $nombre;
        $this->id_caja = $id_caja;
        $this->id      = $id;
        $sql = "UPDATE Categorias SET Categoria = ?, nombre = ?, id_caja = ?, id = ? WHERE id = $id";
        $datos = array($this->Categoria, $this->nombre, $this->id_caja, $this->id);
        $data = $this->save($sql, $datos);
        if ($data == 1) {
            $res = "modificado";
        }else{
            $res = "error";
        }
        return $res;
    }
    public function accionUsuer(int $estado, int $id)
    {
        $this->id     = $id;
        $this->estado = $estado;
        $sql          = "UPDATE Categorias SET estado = ?, id = ? WHERE id = $id";
        $datos        = array($this->estado, $this->id);
        $data         = $this->save($sql, $datos);
        return $data; 
    }
}
?>